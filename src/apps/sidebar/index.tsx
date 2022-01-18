import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Button } from '@mui/material';
import { useSettings } from 'src/hooks/settings';
import { Zendesk } from 'src/services/zendesk';
import CircularLoading from 'src/components/CircularLoading';
import { Container, Title, ButtonContainer } from './style';

const zend = new Zendesk();

function Sidebar(): JSX.Element {
  const { t } = useTranslation();
  const settings = useSettings();
  const [importerExporter, setImporetExporter] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setLoading(true);
      if (!importerExporter)
        throw new Error(t('apps.sidebar.errorImporterExporterNotInformed'));
      let auxId = importerExporter.toLowerCase();
      const auxIdArray = auxId.split(' ');
      auxId = auxIdArray.join('_');

      zend
        .request({
          url: `/api/v2/ticket_fields/${settings.importer_exporter_field_id}/options`,
          type: 'POST',
          data: {
            custom_field_option: {
              value: auxId,
              name: importerExporter,
              position: amount + 1,
            },
          },
        })
        .catch(() => {
          throw new Error(t('apps.sidebar.errorOnCreateImporterExporter'));
        });
      zend.notify(t('apps.sidebar.successCreateImporterExporter'), 'success');
      setLoading(false);
      return true;
    } catch (err: any) {
      setLoading(false);
      zend.notify(err.message, 'error');
      return false;
    }
  };

  const fetchData = useCallback(async () => {
    if (settings.importer_exporter_field_id) {
      const response = await zend.request({
        url: `/api/v2/ticket_fields/${settings.importer_exporter_field_id}`,
        type: 'GET',
      });
      setAmount(response.ticket_field.custom_field_options.length);
    }
  }, [settings.importer_exporter_field_id]);

  useEffect(() => {
    zend.resize(320, 180);
    fetchData();
  }, [fetchData]);

  return (
    <Container>
      <Title>{t('apps.sidebar.title')}:</Title>
      <TextField
        variant="outlined"
        label={t('apps.sidebar.fieldLabel')}
        fullWidth
        onChange={e => setImporetExporter(e.target.value)}
        inputProps={{ 'data-testid': 'input-importer-exporter' }}
      />
      {loading ? (
        <CircularLoading alignOn="flex-end" />
      ) : (
        <ButtonContainer>
          <Button
            type="button"
            variant="contained"
            onClick={handleCreate}
            data-testid="create-importer-exporter"
          >
            {t('apps.sidebar.buttonText')}
          </Button>
        </ButtonContainer>
      )}
    </Container>
  );
}

export default Sidebar;

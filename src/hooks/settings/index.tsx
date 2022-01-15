import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Zendesk } from 'src/services/zendesk';

const SettingsContext = createContext({});

interface SettingsProviderProps {
  children: ReactNode;
}

const zend = new Zendesk();

function SettingsProvider({ children }: SettingsProviderProps): JSX.Element {
  const { i18n } = useTranslation();
  const [settings, setSettings] = useState({});

  useEffect(() => {
    zend.getSettings().then(settingsAux => {
      setSettings(settingsAux);
      i18n.changeLanguage(settingsAux.language);
    });
  }, [i18n]);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings(): any {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within an SettingProvider');
  }

  return context;
}

export { SettingsProvider, useSettings };

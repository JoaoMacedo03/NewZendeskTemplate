import ZAFClient from 'zendesk_app_framework_sdk';

interface RequestProps {
  url: string;
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  dataType?: string;
  headers?: any;
  secure?: boolean;
  contentType?: string;
  cors?: boolean;
}

export class Zendesk {
  public client: any;

  constructor() {
    this.client = ZAFClient.init();
  }

  request({
    url,
    type,
    data,
    dataType = 'json',
    headers,
    secure,
    contentType,
    cors,
  }: RequestProps): Promise<any> {
    const requestZendesk: RequestProps = {
      url,
      type,
      headers: !headers ? { 'Content-Type': 'application/json' } : headers,
      dataType,
    };

    if (secure) requestZendesk.secure = secure;

    if (data) {
      if (requestZendesk.headers['Content-Type'].includes('json')) {
        requestZendesk.data = JSON.stringify(data);
      } else {
        requestZendesk.data = data;
      }
    }

    if (cors) requestZendesk.cors = cors;
    if (contentType) requestZendesk.contentType = contentType;

    return this.client.request(requestZendesk);
  }

  resize(width: number, height: number): void {
    this.client.invoke('resize', { width, height });
  }

  async getSettings(): Promise<any> {
    const { settings } = await this.client.metadata();
    return settings;
  }

  notify(description: string, type: string, duration?: number | 5000): void {
    this.client.invoke('notify', description, type || undefined, duration);
  }
}

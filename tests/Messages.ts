import * as fs from 'fs';

class Message {
  private messages: { [key: string]: string } = {};

  constructor(filePath: string) {
    this.loadMessages(filePath);
  }

  private loadMessages(filePath: string): void {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const lines = data.split('\n');
      for (const line of lines) {
        const parts = line.split('=');
        if (parts.length === 2) {
          const key = parts[0].trim();
          const value = parts[1].trim();
          this.messages[key] = value;
        }
      }
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

  getMessage(key: string): string | undefined {
    return this.messages[key];
  }
}

export default Message;
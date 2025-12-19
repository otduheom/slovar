require('dotenv').config();
const { GigaChat } = require('gigachat');

class AiService {
  constructor() {
    this.client = new GigaChat({
      model: 'GigaChat-2',
      credentials: process.env.GIGACHAT_KEY,
    });
  }

  async ask(question) {
    console.log(question);
    const response = await this.client.chat({
      messages: [{ role: 'user', content: question }],
    });
    return response.choices[0].message.content;
  }

  async example(text) {
    console.log(text);

    const response = await this.client.chat({
      messages: [
        {
          role: 'system',
          content: `
Приведи пример использования слова, которое передаст пользователь.

Отвечай только предложением с словом

Например:
user: ЛОЛ
assistent: Это было смешно, ЛОЛ
`,
        },
        { role: 'user', content: text },
      ],
    });

    return response.choices[0].message.content;
  }
}

// const aiService = new AiService();
// aiService.ask('хайп это?').then(console.log);

module.exports = new AiService();

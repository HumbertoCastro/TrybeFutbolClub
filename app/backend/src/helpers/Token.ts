import * as jwt from 'jsonwebtoken';
import fs = require('fs');

export default class Token {
  private static secret: string = fs.readFileSync('jwt.evaluation.key').toString();

  public static CreateToken(payload: object) {
    return jwt.sign(
      payload,
      this.secret,
      { expiresIn: '1h', algorithm: 'HS256' },
    );
  }

  public static OpenToken(token: string): { role: string } {
    return jwt.verify(token, this.secret) as { role: string };
  }
}

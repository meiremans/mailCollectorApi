import config from 'config';
import fs from 'fs';
import path from 'path';
import { verifyEmail, emailExists } from '.';


const emailFile = path.join(config.get('logDirectory'), 'emails.csv');
/**
 *  Logs a person's name and email to the emails.csv file
 * @param name - The first name of the person to store
 * @param email - The email to store
 * @param file - An optional file to log to. Default is emails.csv
 */
export async function logUser(name, email, file = emailFile) {
  if (!verifyEmail(email)) return 'Invalid email';

  if (await emailExists(email, file)) return 'Email exists';

  // Sanitize input
  const sanitizedName = name.replace(',');

  // Log to file
  fs.writeFileSync(file, `${sanitizedName}, ${email}\n`, { flag: 'a' });
  return 'Successfully registered';
}

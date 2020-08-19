/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import path from 'path';
import fs from 'fs';
import { exec } from 'shelljs';
import { Error } from 'mongoose';

export function printFile(content: any, fileName: string) {
  try {
    const buffer = Buffer.from(content, 'binary');

    const dir =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes')
        : process.env.DIR_PRODUCTION;

    fs.writeFile(
      `${dir}/${fileName}.rtf`,
      buffer,
      { encoding: 'utf-8', flag: 'w' },
      () => {},
    );
  } catch (error) {
    throw new Error(error.message);
  }

  const vbs =
    process.env.NODE_ENV === 'test'
      ? path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          '__tests__',
          'recipes',
          'impressao.vbs',
        )
      : process.env.DIR_INITIALIZE_PRINT;

  if (vbs) {
    setTimeout(() => {
      exec(vbs);
    }, 1000);
  }
}

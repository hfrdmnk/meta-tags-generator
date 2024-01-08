import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generate } from './generate';

yargs(hideBin(process.argv))
	.command(
		'from <url>',
		'Fetches a URL and generates corresponding meta tags',
		(yargs) => {
			yargs.positional('url', {
				describe: 'URL to fetch',
				type: 'string',
			});
		},
		(argv) => {
			generate(argv.url as string);
		}
	)
	.parse();

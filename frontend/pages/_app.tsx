import type { AppProps } from 'next/app';
import Page from '../components/Page';
//If progress bar needed - https://www.npmjs.com/package/nextjs-progressbar

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Page>
            <Component {...pageProps} />
        </Page>
    )
}
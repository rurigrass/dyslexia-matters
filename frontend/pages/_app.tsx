import Page from '../components/Page';
import { NextPageContext } from 'next';
import type { AppProps, AppContext } from 'next/app';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
//If progress bar needed - https://www.npmjs.com/package/nextjs-progressbar

type ApolloProps = {
    apollo: ApolloClient<any>;
};
type ApolloAppProps = ApolloProps & AppProps;

function MyApp({ Component, pageProps, apollo }: ApolloAppProps) {
    return (
        <ApolloProvider client={apollo}>
            <Page>
                <Component {...pageProps} />
            </Page>
        </ApolloProvider>
    )
}

type MyAppProps = AppContext & NextPageContext;

MyApp.getInitialProps = async function ({ Component, ctx }: MyAppProps) {
    let pageProps: { query?: NextPageContext['query'] } = {};

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.query = ctx.query;
    return { pageProps };
};

export default withData(MyApp)
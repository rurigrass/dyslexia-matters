import { createGlobalStyle } from "styled-components";
import Header from "./Header";

interface Props {
  children: JSX.Element
}

const GlobalStyles = createGlobalStyle`
  html{
    --black: #393939;
    --white:#FFFFFF; 
    --darkBlue:#254085;
    --lightBlue:#1190CB;
    --pink:#DE0A82;
    --orange:#F47B21;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
  }
`

const Page: React.FC<Props> = ({ children }) => (
  <div>
    <GlobalStyles />
    <Header />
    <h2>I am the page component</h2>
    {children}
  </div>
)

export default Page

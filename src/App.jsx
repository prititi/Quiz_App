import Footer from "./Footer/Footer";
import MainContainer from "./MainContainer";
import { styled } from "@mui/system";

function App() {
  const RootContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  });

  const ContentContainer = styled("div")({
    flex: "1 0 auto",
  });

  const FooterStyle = styled("footer")(({ theme }) => ({
    flexShrink: 0,
    color: theme.palette.primary.contrastText,
  }));

  return (
    <RootContainer>
      <ContentContainer>
        <MainContainer />
      </ContentContainer>
      <FooterStyle>
        <Footer />
      </FooterStyle>
    </RootContainer>
  );
}

export default App;

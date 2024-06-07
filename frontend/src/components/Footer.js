import { EmailOutlined, Facebook, Instagram, Phone, Pinterest, Room, Twitter } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import logo from "../data/imgs/logo_travel.png";
const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })};
    // background-color: #f9f9f9;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1``
const Desc = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor:"#fff8f8" })};
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
  return (
    <div className="bg-white  mt-5">
    <Container className="container">
        <Left>
            <Logo><img src={logo} alt="logo" style={{width: '100px'}}></img></Logo>
            <Desc>
                Chúng tôi vô cùng hân hoan và biết ơn với sự tin tưởng và ủng hộ của quý khách hàng. Sự hài lòng của quý khách là niềm động lực lớn để chúng tôi tiếp tục nỗ lực và phát triển hơn nữa.
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook />
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram />
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter />
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest />
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Right >
            <Title>Contact</Title>
            <ContactItem><Room style={{marginRight:"10px"}}/>18/43 to 5, khu pho 6, phuong Linh Trung, TP.Thu Duc, HCM</ContactItem>
            <ContactItem><Phone style={{marginRight:"10px"}}/>+84 355 422 160</ContactItem>
            <ContactItem><EmailOutlined style={{marginRight:"10px"}}/>binhquoc23@gmail.com</ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"></Payment>
        </Right>

    </Container>
    </div>
  )
}

export default Footer
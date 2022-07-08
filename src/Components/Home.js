import { useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/images/logoNarutin.png"

export default function Home(){
    const[inventory, setInventory] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
    const promise = axios.get("http://localhost:5000/products");
    promise.then(response=>setInventory(response.data.sort((a,b)=>b.value-a.value)))
    },[])

    function Product({image, name, value}){
        const formatter = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        });
        return(
                <ProductBox onClick={()=>navigate(`/products/${name}`)}>
                    <img src={image} alt={name} />
                    <p>{name}</p>
                    <p>{formatter.format(value)}</p>
                </ProductBox>
        )
    }

    function renderHighlights(){
        const highlights= inventory.slice(0,5);

        return highlights.map(product=><Product id={product._id} image={product.image} name={product.name} value={product.value}/>)
    }

    function renderInterestProduct(){
        const interestProduct= inventory.slice(5,20);

        return interestProduct.map(product=><Product id={product._id} image={product.image} name={product.name} value={product.value}/>)
    }

    return (
        <Main>
            <Header>
                <div>
                    <img src={logo} alt="Logo narutin" />
                    <h1>Narutin</h1>
                </div>
                <div>
                    <ion-icon name="person" onClick={()=>navigate("/login")}></ion-icon>
                    <ion-icon name="cart" onClick={()=>navigate("/cart")}></ion-icon>
                </div>
            </Header>
            <SubTitle>Em destaque</SubTitle>
            <HighlightsList>
                {renderHighlights()}
            </HighlightsList>
            <SubTitle>Talvez se interesse por</SubTitle>
            <GridProdutos>
                {renderInterestProduct()}
            </GridProdutos>
        </Main>
    )
}

const Main = styled.div`
    padding-top: 105px;
    padding-bottom: 25px;
    display: flex;
    flex-direction: column;
    min-width:100vw;
    min-height: 100vh;
    align-items: center;
    background-color: #000000;
`

const Header = styled.header`
    width: 100%;
    height: 85px;
    background-color: #F47213;
    display: flex;
    justify-content: space-between;
    align-items:center;
    position: fixed;
    top: 0;
    left: 0;

    h1{
        font-family: 'Permanent Marker';
        font-weight: 400;
        font-size: 32px;
        color:#000000;
    }

    div{
        display:flex;
        align-items:center;
    }

    ion-icon{
        font-size: 32px;
        color:#000000;
        margin-right: 15px;
    }
`

const HighlightsList= styled.div`
    height: 210px;
    width: 100vw;
    display: flex;
    overflow-x: scroll;
    margin-bottom: 20px;
    
    div{
        margin-right: 10px;
        margin-left: 10px;
    }

    img{
        width:100%;
        height: 65%;
    }
`

const ProductBox= styled.div`
    min-height:210px;
    width: 170px;
    word-wrap: break-word;
    background-color: #F47213;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    padding: 6px;

    img{
        width: 158px;
        height: 65%;
        border-radius: 5px;
    }

    p{
        color:#000000;
        font-weight: 700;
        font-size:14px;
    }
`

const SubTitle= styled.h1`
    font-family: 'Permanent Marker';
    font-weight: 400;
    font-size: 32px;
    color:#ffffff;
    margin-bottom: 20px;
`

const GridProdutos= styled.div`
    width: 100vw;
    display:flex;
    justify-content:space-between;
    flex-wrap: wrap;

    div{
        margin-left:10px;
        margin-right: 10px;
        margin-top: 20px;
    }
`
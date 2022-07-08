import { useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/images/logoNarutin.png"

export default function Home(){

    function Product({image, name, value}){
        const formatter = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        });
        return(
            <ProductBox>
                <img src={image} alt={name} />
                <p>{name}</p>
                <p>{formatter.format(value)}</p>
            </ProductBox>
        )
    }

    return (
        <Main>
            <Header>
                <div>
                    <img src={logo} alt="Logo narutin" />
                    <h1>Narutin</h1>
                </div>
                <div>
                    <ion-icon name="person"></ion-icon>
                    <ion-icon name="cart"></ion-icon>
                </div>
            </Header>
            <SubTitle>Em destaque</SubTitle>
            <HighlightsList>
                <Product image="https://http2.mlstatic.com/D_NQ_NP_694288-MLB44232499133_122020-O.webp" name="Cosplay Do Naruto Modo Sennin" value={400}/>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
            </HighlightsList>
            <SubTitle>Talvez se interesse por</SubTitle>
            <GridProdutos>
            <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
                <ProductBox>
                </ProductBox>
            </GridProdutos>
        </Main>
    )
}

const Main = styled.div`
    padding-top: 105px;
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
    height:210px;
    min-width: 170px;
    background-color: #F47213;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    padding: 6px;

    img{
        width: 100%;
        height: 65%;
        border-radius: 5px;
    }

    p{
        color:#000000;
        font-weight: 700;
        font-size:14px;
        margin-bottom: 5px;
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
import styled from 'styled-components'

export const FaucetButton =styled.button`


text-transform:capitalized;
text-align:center;
position: relative;
width:125px;
height:39px;

background: linear-gradient(to bottom, rgb(17, 17, 17),rgb(26, 15, 18),rgb(61, 33, 33), rgb(39, 24, 24), rgb(0, 0, 0));
background: linear-gradient(to left, rgb(1, 1, 5), rgb(0, 28, 88));
border:0.2rem solid var(--mainDark);
border-bottom:1px solid  rgb(219, 206, 164);
border-top:1px solid  rgb(219, 206, 164);
border-left: 2px solid rgb(219, 206, 164);
border-right: 2px solid rgb(219, 206, 164);
font-family: 'Frank Ruhl Libre', serif;
color:white;
border-radius:10px;
padding:1px;
box-shadow:0 0 1px rgb(238, 193, 47), 0 0 1px rgb(247, 191, 10);
cursor:pointer;
margin-left:-3px;
overflow:hidden;
transition:all 0.2s ease-in-out;
-webkit-text-stroke:0.00001px #3433;
    text-shadow:2px 2px 0 black,
                1px 3px 0 #000,
                1px 2px 0 #000,
                1px 2px 0 #000,
                2px 3px 0 #000;
&:hover{
    
    color:white;
   
&focus{
    outline:none;

}


}
`
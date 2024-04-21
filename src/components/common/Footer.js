import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import { connect } from 'react-redux';
import { actionCreators } from "../../globalReduxStore/actions";
import { useSelector } from 'react-redux';
const getProductById = (state, productId) => {
  return state.product.products.find(product => product.id === productId);
};

// both connect and useSelector have their use cases.For smaller, functional components,
// useSelector can make your code cleaner and easier to understand.For larger, 
// lass- based components, or for components that need to optimize rendering 
// performance, connect might be a better choice.
const Footer = ({ product, setProduct }) => {
  // dispatch(actionCreators.setProduct(product));
  const productId = 2;
  const [localProduct, setlocalProduct] = useState(null);
  const productById = useSelector(state => getProductById(state, productId));
  console.log(productById, 'productById from redux');




  console.log(localProduct);

  useEffect(() => {
    const demoProduct = {
      id: 1,
      name: 'Demo Product',
      price: '$19.99',
      description: 'This is a demo product description.',
    };
    setProduct(demoProduct);
  }, [setProduct]);
  console.log(product, 'product from redux');

  const Customers = {
    heading: 'Customer Care',
    text1: 'Help Center',
    text2: 'How to Buy',
    text3: 'Corporate & Bulk Purchasing',
    text4: 'Return & Refunds',
    text5: 'MaxStore',
    text6: 'Contact Us',
    text7: 'Purchase Protection',
    text8: 'MaxStore Pick up Points',
  };

  const Money = {
    heading: 'Make Money With Us',
    text1: 'MaxStore University',
    text2: 'Sell on MaxStore',
    text3: 'Join MaxStore Affiliate Program',
  };

  const MaxStore = {
    heading: 'MaxStore',
    text1: 'About Us',
    text2: 'Digital Payments',
    text3: 'MaxStore Donates',
    text4: 'MaxStore Blog',
    text5: 'Terms & Conditions',
    text6: 'Privacy Policy',
    text7: 'Online Shopping App',
    text8: 'Online Grocery Shopping',
    text9: 'MaxStore Exclusive',
  };

  const Payment = {
    heading: 'Payment Methods',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfLQE9oArUpGqvHQO_iFkC_6i5b5sgr-X2o7QxGezcYluJPPvhkV-0Ce2u9DHgS1U9e8w&usqp=CAU',
      'https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png',
      'https://cdn.iconscout.com/icon/free/png-256/free-mastercard-credit-debit-card-bank-transaction-32303.png',
      'https://brandlogovector.com/wp-content/uploads/2021/09/Easypaisa-New-Icon-Logo.png',
      'https://play-lh.googleusercontent.com/uNsO0CueIvfXSNf6R7WaGwdx6vsUDLjqTmdR0KO84ku7SR0teFBWdCenrngxJEVzM80',
    ]
  };

  return (
    <footer style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid silver' }}>
      <div>
        <div>
          <h3 style={{ fontSize: '25px', fontWeight: '500', marginTop: '20px' }}>{Customers.heading}</h3>
          <ul>
            <li><Link to="/help">{Customers.text1}</Link></li>
            <li><Link to="/how-to-buy">{Customers.text2}</Link></li>
            <li><Link to="/corporate">{Customers.text3}</Link></li>
            <li><Link to="/return-refunds">{Customers.text4}</Link></li>
            <li><Link to="/maxstore">{Customers.text5}</Link></li>
            <li><Link to="/contact">{Customers.text6}</Link></li>
            <li><Link to="/purchase-protection">{Customers.text7}</Link></li>
            <li><Link to="/pick-up-points">{Customers.text8}</Link></li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <h3 style={{ fontSize: '25px', fontWeight: '500', marginTop: '20px' }}>{Money.heading}</h3>
          <ul>
            <li><Link to="/maxstore-university">{Money.text1}</Link></li>
            <li><Link to="/sell-on-maxstore">{Money.text2}</Link></li>
            <li><Link to="/affiliate-program">{Money.text3}</Link></li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <h3 style={{ fontSize: '25px', fontWeight: '500', marginTop: '20px' }}>{MaxStore.heading}</h3>
          <ul>
            <li><Link to="/about-us">{MaxStore.text1}</Link></li>
            <li><Link to="/digital-payments">{MaxStore.text2}</Link></li>
            <li><Link to="/maxstore-donates">{MaxStore.text3}</Link></li>
            <li><Link to="/maxstore-blog">{MaxStore.text4}</Link></li>
            <li><Link to="/terms-conditions">{MaxStore.text5}</Link></li>
            <li><Link to="/privacy-policy">{MaxStore.text6}</Link></li>
            <li><Link to="/online-shopping-app">{MaxStore.text7}</Link></li>
            <li><Link to="/online-grocery-shopping">{MaxStore.text8}</Link></li>
            <li><Link to="/maxstore-exclusive">{MaxStore.text9}</Link></li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <h3 style={{ fontSize: '25px', fontWeight: '500', marginTop: '20px' }}>{Payment.heading}</h3>
          <div style={{ display: 'flex', marginRight: '40px' }}>
            {Payment.images.map((image, index) => (
              <img key={index} src={image} alt="payment" style={{ width: '50px', height: '30px', marginRight: '10px', marginTop: '20px', cursor: 'pointer', }} />
            ))}
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <h3 style={{ fontSize: '25px', fontWeight: '500' }}>Follow Us</h3>
          <div style={{ display: 'flex', marginTop: '15px' }}>

            <Link to="/website" className="icon"><LanguageIcon style={{ cursor: 'pointer' }} /></Link>
            <Link to="/facebook" className="icon"><FacebookIcon style={{ marginLeft: '10px', cursor: 'pointer' }} /></Link>
            <Link to="/twitter" className="icon"> <TwitterIcon style={{ marginLeft: '10px', cursor: 'pointer' }} /></Link>
            <Link to="/instagram" className="icon"><InstagramIcon style={{ marginLeft: '10px', cursor: 'pointer' }} /></Link>
            <Link to="/youtube" className="icon"> <YouTubeIcon style={{ marginLeft: '10px', cursor: 'pointer' }} /></Link>
          </div>
        </div>
      </div>
      <style>
        {`
    li {
      font-size: 18px;
      position: relative;
      display: flex;
      margin-bottom: 5px;
    }
    li:hover {
      color: gray; 
    }
    .icon:hover {
      color : gray;
    }
  `}
      </style>



    </footer>
  );
};

const mapStateToProps = (state) => ({
  product: state,
});

const mapDispatchToProps = (dispatch) => ({
  setProduct: (product) => {
    dispatch(actionCreators.setProduct(product));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FaAngleLeft, FaAngleRight, FaCircle } from 'react-icons/fa';

import '../styles/pages/_Product.scss';

import BlackBtn from '../components/button/BlackBtn';
import WhiteBtn from '../components/button/WhiteBtn';

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [imgArray, setImgArray] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [slidePx, setSlidePx] = useState(0);
  const [userProfile, setUserProfile] = useState({});

  const imgDiv = useRef();
  const heartIcon = useRef();
  const IMG_WIDTH = 500;

  if (heartIcon.current) {
    if (clicked && !heartIcon.current.classList.contains('clicked')) {
      heartIcon.current.classList.add('clicked');
    } else if (!clicked && heartIcon.current.classList.contains('clicked')) {
      heartIcon.current.classList.remove('clicked');
    }
  }

  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get(`http://localhost:5000/product/${id}`)
        .then(async (res) => {
          let productInfo = res.data[0];
          //유저정보 get
          await axios
            .get(`http://localhost:5000/profile/${res.data[0].userID}`)
            .then((res) => {
              setUserProfile(res.data.profileData);
            });

          await axios
            .get(`http://localhost:5000/category/${res.data[0].cateID}`)
            .then(async (res) => {
              if (res.data === undefined) {
                return;
              }

              let productCate = res.data[0].cateNAME;
              await axios
                .get(`http://localhost:5000/product/${id}/tags`)
                .then((res) => {
                  setProduct({
                    ...productInfo,
                    cateNAME: productCate,
                    tags: res.data,
                  });
                });
            });
        });
    };

    const getImgs = async () => {
      await axios
        .get(`http://localhost:5000/product/${id}/imgs`)
        .then((res) => {
          setImgArray(res.data);
        });
    };

    getProduct();
    getImgs();
  }, [id]);

  if (product.tags) {
    return (
      <div className='Product'>
        <div className='Product-wrapper'>
          <div className='Product-background'>
            <section id='Product-detail'>
              <div className='Product-imgs'>
                <div className='Product-slider'>
                  <div
                    className='img-wrapper'
                    ref={imgDiv}
                    style={{
                      transform: `translateX(${slidePx}px)`,
                      transition: '0.5s ease',
                    }}
                  >
                    {imgArray.map((img) => {
                      return (
                        <img
                          className='Product-img'
                          id={img.imgOrder}
                          key={img.imgOrder}
                          src={`http://localhost:5000/src/img/${img.imgID}.jpg`}
                          alt=''
                        />
                      );
                    })}
                  </div>
                </div>
                {imgArray.length === 1 ? (
                  <></>
                ) : (
                  <div>
                    <div
                      onClick={(e) => {
                        setSlidePx(
                          -IMG_WIDTH * (e.target.closest('div').id - 1),
                        );
                      }}
                      className='img-circle-btn-wrapper'
                    >
                      {imgArray.map((img) => {
                        return (
                          <div key={img.imgOrder} id={img.imgOrder}>
                            <FaCircle className='circle-btn' />
                          </div>
                        );
                      })}
                    </div>
                    <FaAngleLeft
                      onClick={() => {
                        if (slidePx === 0) {
                          return;
                        }
                        setSlidePx(slidePx + IMG_WIDTH);
                      }}
                      className='img-left-btn'
                    />
                    <FaAngleRight
                      onClick={() => {
                        if (
                          slidePx - IMG_WIDTH <=
                          -IMG_WIDTH * imgArray.length
                        ) {
                          return;
                        }
                        setSlidePx(slidePx - IMG_WIDTH);
                      }}
                      className='img-right-btn'
                    />
                  </div>
                )}
              </div>
              <div className='Product-info'>
                <p id='category'>{product.cateNAME}</p>
                <p id='name'>{product.prodNAME}</p>
                <p id='tags'>
                  {product.tags.map((tag) => {
                    return <span key={tag.tagID}>#{tag.tagNAME}</span>;
                  })}
                </p>
                <div id='user-info'>
                  <Link to={`/profile/${product.userID}`}>
                    <div>
                      <img
                        className='profile'
                        src={userProfile.userIcon}
                        alt=''
                      />
                      <span id='username'>{userProfile.nickname}</span>
                    </div>
                  </Link>
                  <div className='btn-wrapper'>
                    <WhiteBtn id={'btn-dm'} text={'DM'} />
                    <FontAwesomeIcon
                      className='message-icon'
                      icon={faMessage}
                    />
                  </div>
                </div>
                <div id='btns'>
                  <BlackBtn
                    goToLink={product.link}
                    id={'buy-btn'}
                    text={'구입하기'}
                  />
                  <FontAwesomeIcon
                    ref={heartIcon}
                    onClick={() => setClicked(!clicked)}
                    className='heart-icon'
                    icon={faHeart}
                  />
                </div>
              </div>
            </section>
            <section id='Product-desc'>
              <hr />
              {product.detail.split('\\n').map((sentence, i) => {
                return (
                  <p key={i} id='sentence'>
                    {sentence}
                  </p>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    );
  }
};

export default Product;

import { useState } from 'react';

import '../../styles/components/profile/_ProfileArea.scss';
import '../../styles/components/profileEdit/_ProfileEditArea.scss';
import userIcon from '../../assets/profile.jpg';
import AddSnsInfo from './AddSnsInfo';

const ProfileEditArea = ({ profileData, snsData }) => {
  const [inputs, setInputs] = useState({
    nickname: profileData.nickname,
    introduce: profileData.introduce,
  });
  // const [snsList, setSnsList] = useState({});

  const { nickname, introduce } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <div className='ProfileArea'>
      <div className='Profile-wrapper'>
        <p className='ProfileEdit-title'>프로필 수정</p>
        <div className='ProfileEdit-body-container'>
          <div className='userIco-container'>
            <img className='ProfileEdit-userIco' src={userIcon} alt='' />
            <button className='img-btn'>사진선택</button>
          </div>
          <div className='ProfileEdit-text-section'>
            <input
              type='text'
              name='nickname'
              className='editNick-input'
              onChange={onChange}
              value={nickname}
            />
            <textarea
              type='text'
              name='introduce'
              className='editIntro-text'
              onChange={onChange}
              value={introduce}
            />
            <AddSnsInfo snsData={snsData}></AddSnsInfo>
          </div>
        </div>
        <div className='Edit-btn-container'>
          <button className='Edit-btn'>수정 취소</button>
          <button className='Edit-btn'>수정 완료</button>
        </div>
      </div>
    </div>
  );
};
export default ProfileEditArea;
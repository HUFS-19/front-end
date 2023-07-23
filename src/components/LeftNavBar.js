import UserWrapper from './UserWrapper';
import CategoryWrapper from './CategoryWrapper';

import '../styles/components/_LeftNavBar.scss';

const LeftNavBar = () => {
  return (
    <div className='LeftNavBar'>
      <div className='navbar_logo'>
        <p>
          이거<span>?</span>
        </p>
        <hr />
        <p>
          <span>!</span>추천
        </p>
      </div>
      <UserWrapper className='UserWrapper' />
      <CategoryWrapper />
    </div>
  );
};

export default LeftNavBar;

import { ReactComponent as CameraIcon } from 'img/svg/camera.svg';
import { ReactComponent as EditIcon } from 'img/svg/edit.svg';
import { ReactComponent as LogoutIcon } from 'img/svg/logout.svg';
import { ReactComponent as DefaultIcon } from 'img/svg/photo-default.svg';
import { ReactComponent as CheckIcon } from 'img/svg/check.svg';
import { useState, useEffect, useRef } from 'react';
import { selectUser, selectIsLogin } from 'redux/auth/selectors';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserInfo,
  updateUserInfo,
  logout,
  updateAvatar,
} from 'redux/auth/auth-operations';
import styles from './UserInfo.module.scss';

export default function UserInfo() {
  const userInfo = useSelector(selectUser);
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    name: '',
    email: '',
    birthday: '',
    phone: '',
    city: '',
  });

  const [editField, setEditField] = useState('');

  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    birthday: useRef(null),
    phone: useRef(null),
    city: useRef(null),
  };

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    await dispatch(updateAvatar(formData));
  };

  useEffect(() => {
    if (userInfo) {
      setFields({
        name: userInfo.name || '',
        email: userInfo.email || '',
        birthday: formatBirthday(userInfo.birthday) || '',
        phone: userInfo.phone || '',
        city: userInfo.city || '',
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (isLogin) {
      dispatch(getUserInfo());
    }
  }, [dispatch, isLogin]);

  const handleEditClick = field => {
    setEditField(field);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFields(prevFields => ({ ...prevFields, [name]: value }));
  };

  const handleInputBlur = () => {
    dispatch(updateUserInfo({ [editField]: fields[editField] }));
    setEditField('');
  };

  const formatBirthday = birthday => {
    const date = new Date(birthday);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}.${month}.${year}`;
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div className={styles.infobox}>
        <div className={styles.decktop}>
          <div className={styles.photo}>
            {userInfo && userInfo.avatarURL && userInfo.avatarURL !== '' ? (
              <img
                className={styles.userAvatar}
                src={userInfo.avatarURL}
                alt="userAvatar"
                width="182px"
                height="182px"
              />
            ) : (
              <DefaultIcon className={styles.user__icon} />
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div className={styles.camera__title} onClick={handleUploadClick}>
              <CameraIcon className={styles.user__camera} />
              <p className={styles.edit}>Edit photo</p>
            </div>
          </div>
        </div>
        <div className={styles.decktop}>
          <div className={styles.information}>
            <label className={styles.text}>
              Name:
              {editField === 'name' ? (
                <>
                  <input
                    ref={inputRefs.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    name="name"
                    className={styles.input}
                    value={fields.name}
                  />
                  <CheckIcon
                    className={styles.check__icon}
                    onClick={handleInputBlur}
                  />
                </>
              ) : (
                <>
                  <input
                    name="name"
                    className={styles.input}
                    value={fields.name}
                    readOnly
                  />
                  <EditIcon
                    className={styles.edit__icon}
                    onClick={() => handleEditClick('name')}
                  />
                </>
              )}
            </label>

            <label className={styles.text}>
              Email:
              {editField === 'email' ? (
                <>
                  <input
                    ref={inputRefs.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    name="email"
                    className={styles.input}
                    value={fields.email}
                  />
                  <CheckIcon
                    className={styles.check__icon}
                    onClick={handleInputBlur}
                  />
                </>
              ) : (
                <>
                  <input
                    name="email"
                    className={styles.input}
                    value={fields.email}
                    readOnly
                  />
                  <EditIcon
                    className={styles.edit__icon}
                    onClick={() => handleEditClick('email')}
                  />
                </>
              )}
            </label>

            <label className={styles.text}>
              Birthday:
              {editField === 'birthday' ? (
                <>
                  <input
                    ref={inputRefs.birthday}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    name="birthday"
                    className={styles.input}
                    value={fields.birthday}
                  />
                  <CheckIcon
                    className={styles.check__icon}
                    onClick={handleInputBlur}
                  />
                </>
              ) : (
                <>
                  <input
                    name="birthday"
                    className={styles.input}
                    value={fields.birthday}
                    readOnly
                  />
                  <EditIcon
                    className={styles.edit__icon}
                    onClick={() => handleEditClick('birthday')}
                  />
                </>
              )}
            </label>

            <label className={styles.text}>
              Phone:
              {editField === 'phone' ? (
                <>
                  <input
                    ref={inputRefs.phone}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    name="phone"
                    className={styles.input}
                    value={fields.phone}
                  />
                  <CheckIcon
                    className={styles.check__icon}
                    onClick={handleInputBlur}
                  />
                </>
              ) : (
                <>
                  <input
                    name="phone"
                    className={styles.input}
                    value={fields.phone}
                    readOnly
                  />
                  <EditIcon
                    className={styles.edit__icon}
                    onClick={() => handleEditClick('phone')}
                  />
                </>
              )}
            </label>

            <label className={styles.text}>
              City:
              {editField === 'city' ? (
                <>
                  <input
                    ref={inputRefs.city}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    name="city"
                    className={styles.input}
                    value={fields.city}
                  />
                  <CheckIcon
                    className={styles.check__icon}
                    onClick={handleInputBlur}
                  />
                </>
              ) : (
                <>
                  <input
                    name="city"
                    className={styles.input}
                    value={fields.city}
                    readOnly
                  />
                  <EditIcon
                    className={styles.edit__icon}
                    onClick={() => handleEditClick('city')}
                  />
                </>
              )}
            </label>
          </div>
          <div className={styles.logout} onClick={handleLogoutClick}>
            <LogoutIcon className={styles.logout__icon} />
            <p className={styles.logout__text}>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

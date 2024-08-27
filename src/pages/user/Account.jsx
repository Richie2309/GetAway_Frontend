import React, { useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { getUserData, updateBankAccount, updateIdentity, updatePassword, updateProfile } from '../../api/user';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { updateName } from '../../redux/slice/userAuthSlice';

const Account = () => {
  const dispatch=useDispatch()
  // State for profile information
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  // State for profile errors
  const [profileErrors, setProfileErrors] = useState({
    fullName: '',
    phone: ''
  });

  // State for password change
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // State for password errors
  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // State for identity verification
  const [identityImages, setIdentityImages] = useState([]);

  // State for identity errors
  const [identityError, setIdentityError] = useState('');

  // State for bank account information
  const [bankAccount, setBankAccount] = useState({
    accountNumber: '',
    ifscCode: ''
  });

  // State for bank account errors
  const [bankAccountErrors, setBankAccountErrors] = useState({
    accountNumber: '',
    ifscCode: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        const userData = response.data.user;
        console.log(userData);
        setProfile({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone || ''
        });

        setBankAccount({
          accountNumber: userData.bank_account_number || '',
          ifscCode: userData.ifsc_code || ''
        });

        setIdentityImages(userData.id_proof || []);

      } catch (err) {
        console.log('Error getting user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const validateProfile = () => {
    let isValid = true;
    const errors = { fullName: '', phone: '' };

    if (!profile.fullName) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }

    if (profile.phone && !/^\d{10}$/.test(profile.phone)) {
      errors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    setProfileErrors(errors);
    return isValid;
  };

  const validatePasswords = () => {
    let isValid = true;
    const errors = { newPassword: '', confirmPassword: '' };

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passwords.newPassword)) {
      errors.newPassword = 'Invalid password';
      isValid = false;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setPasswordErrors(errors);
    return isValid;
  };

  const validateIdentity = () => {
    let isValid = true;
    let error = '';

    if (identityImages.length === 0) {
      error = 'Please upload your identity document.';
      isValid = false;
    }

    setIdentityError(error);
    return isValid;
  };

  const validateBankAccount = () => {
    let isValid = true;
    const errors = { accountNumber: '', ifscCode: '' };

    if (bankAccount.accountNumber && !/^\d{9,18}$/.test(bankAccount.accountNumber)) {
      errors.accountNumber = 'Bank account number must be between 9 to 18 characters';
      isValid = false;
    }

    if (bankAccount.ifscCode && bankAccount.ifscCode.length !== 11) {
      errors.ifscCode = 'IFSC code must be 11 characters';
      isValid = false;
    }

    setBankAccountErrors(errors);
    return isValid;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    if (validateProfile()) {
      try {
        await updateProfile(profile);
        message.success('Profile updated successfully');
        dispatch(updateName(profile.fullName))
      } catch (err) {
        console.log('Error updating profile:', err);
        message.error('Failed to update profile');
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      try {
        await updatePassword(passwords.newPassword);
        message.success('Password changed successfully');
        console.log('Password changed successfully');
      } catch (error) {
        console.log('Error changing password:', error);
        message.error('Failed to change password');
      }
    }
  };

  const handleIdentityVerification = async (e) => {
    e.preventDefault()
    if (validateIdentity()) {
      try {
        await updateIdentity(identityImages);
        message.success('Identity verification successful');
        setIdentityError('');
      } catch (error) {
        console.log('Error verifying identity:', error);
        message.error('Failed to verify identity. Please try again.');
        setIdentityError('Failed to verify identity. Please try again.');
      }
    }
  };

  const handleIdentityImageUpload = async (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    if (identityImages.length + files.length > 2) {
      setIdentityError('You can upload a maximum of 2 images.');
      return;
    }

    const newImages = [];

    for (const file of files) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          newImages.push(base64String);

          // Check if all files have been processed
          if (newImages.length === files.length) {
            const updatedImages = [...identityImages, ...newImages];
            setIdentityImages(updatedImages);
            setIdentityError('');
          }
        };
        reader.readAsDataURL(file);
        await updateIdentity(identityImages);
        message.success('Identity images uploaded successfully');
      } catch (error) {
        console.log('Error uploading identity image:', error);
        setIdentityError('Failed to upload image. Please try again.');
        message.error('Failed to upload image. Please try again.');
      }
    }
  };

  const handleBankAccountAddition = async (e) => {
    e.preventDefault();
    if (validateBankAccount()) {
      try {
        await updateBankAccount(bankAccount);
        message.success('Bank account added successfully');
      } catch (error) {
        console.log('Error adding bank account:', error);
        message.error('Failed to add bank account');
      }
    }
  };



  return (
    <>
      <div className="container mx-auto flex font-poppins mb-10">
        <div className="flex-1 flex justify-center mb-10">
          <main className="bg-card shadow max-w-3xl w-full">
            <h1 className="text-2xl font-bold mb-6">Your Account</h1>

            {/* Profile Information Form */}
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-primary">Full name</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded shadow-slate-400 shadow-sm"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
                {profileErrors.fullName && <p className="text-red-500 text-sm">{profileErrors.fullName}</p>}
              </div>
              <div>
                <label className="block text-primary">Email</label>
                <input
                  type="email"
                  className="w-full border p-2 rounded shadow-slate-400 shadow-sm"
                  value={profile.email}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-primary">Phone</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded shadow-slate-400 shadow-sm"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
                {profileErrors.phone && <p className="text-red-500 text-sm">{profileErrors.phone}</p>}
              </div>
              <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mb-11">Save</button>
            </form>

            {/* Password Change Form */}
            <form onSubmit={handlePasswordChange} className="space-y-6 mt-10">
              <h2 className="text-xl font-semibold">Change your password</h2>
              <div className="mt-4">
                <label className="block text-primary">New Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded shadow-slate-400 shadow-sm"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                />
                {passwordErrors.newPassword && <p className="text-red-500 text-sm">{passwordErrors.newPassword}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-primary">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded shadow-slate-400 shadow-sm"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                />
                {passwordErrors.confirmPassword && <p className="text-red-500 text-sm">{passwordErrors.confirmPassword}</p>}
              </div>
              <p className="text-primary text-sm mt-2">
                Password requirements:
                <br />• At least 8 characters long <br />• Contains letters, at least one digit, and a symbol
              </p>
              <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mb-11">Change</button>
            </form>

            {/* Identity Verification Form */}
            <form onSubmit={handleIdentityVerification} className="space-y-6 mt-10">
              <h2 className="text-xl font-semibold mb-2">Verify your identity</h2>
              <span>Upload your Passport/Driver's license/Identity card</span>
              <div className="w-1/2 flex justify-center border-2 border-gray-200 rounded-2xl py-4">
                <div className="space-y-1 text-center">
                  <IoCloudUploadOutline className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleIdentityImageUpload} accept='image/*' multiple />
                    </label>
                  </div>
                </div>
              </div>

              {identityError && <p className="text-red-500 text-sm">{identityError}</p>}
              {/* Display uploaded images */}
              <div className="mt-4 flex flex-wrap gap-4">
                {identityImages && identityImages.length > 0 && identityImages.map((imageUrl, index) => (
                  imageUrl && (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Identity document ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  )
                ))}
              </div>
              <p className="text-primary text-sm mt-2">Your ID will be handled according to our <a href="#" className="text-accent">Privacy Policy</a> and won't be shared with your Host or guests.</p>
              <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mb-11">Save</button>
            </form>

            {/* Bank Account Form */}
            <form onSubmit={handleBankAccountAddition} className="space-y-6 mt-10">
              <h2 className="text-xl font-semibold">Add your bank account</h2>
              <div className="mt-4">
                <label className="block text-primary">Bank account number</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded shadow-slate-400 shadow-sm"
                  value={bankAccount.accountNumber}
                  onChange={(e) => setBankAccount({ ...bankAccount, accountNumber: e.target.value })}
                />
                {bankAccountErrors.accountNumber && <p className="text-red-500 text-sm">{bankAccountErrors.accountNumber}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-primary">IFSC code</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded shadow-slate-400 shadow-sm"
                  value={bankAccount.ifscCode}
                  onChange={(e) => setBankAccount({ ...bankAccount, ifscCode: e.target.value })}
                />
                {bankAccountErrors.ifscCode && <p className="text-red-500 text-sm">{bankAccountErrors.ifscCode}</p>}
              </div>
              <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Save</button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default Account;

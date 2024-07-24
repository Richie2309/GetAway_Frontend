import React, { useEffect, useState } from 'react';
import ProfileSidebar from '../../components/user/ProfileSidebar';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { getUserData } from '../../api/user';

const Account = () => {

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
  const [identity, setIdentity] = useState({
    link: ''
  });

  // State for identity errors
  // const [identityError, setIdentityError] = useState('');

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

        setProfile({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone || ''
        });

        setBankAccount({
          accountNumber: userData.bank_account_number || '',
          ifscCode: userData.ifsc_code || ''
        });
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

  // const validateIdentity = () => {
  //   let isValid = true;
  //   if (identity.link && !/^https?:\/\/[^\s]+$/.test(identity.link)) {
  //     setIdentityError('Please enter a valid URL');
  //     isValid = false;
  //   } else {
  //     setIdentityError('');
  //   }
  //   return isValid;
  // };

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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile information submission
    console.log('Profile updated:', profile);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPassword === passwords.confirmPassword) {
      // Handle password change
      console.log('Password changed');
    } else {
      console.log('Passwords do not match');
    }
  };

  const handleIdentityVerification = (e) => {
    e.preventDefault();
    // Handle identity verification
    console.log('Identity link:', identity.link);
  };

  const handleBankAccountAddition = (e) => {
    e.preventDefault();
    // Handle bank account addition
    console.log('Bank account added:', bankAccount);
  };

  return (
    <>
      <div className="container mx-auto flex font-poppins mt-10 mb-10">
        <ProfileSidebar />
        <div className="flex-1 flex justify-center">
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
              <button type="submit" className="flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-44 md:py-[8.9px]">Save</button>
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
              <button type="submit" className="flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-44 md:py-[8.9px]">Change</button>
            </form>

            {/* Identity Verification Form */}
            <form onSubmit={handleIdentityVerification} className="space-y-6 mt-10">
              <h2 className="text-xl font-semibold mb-2">Verify your identity</h2>
              <span>Upload your Passport/Driver's license/Identity card</span>
              <div className='flex gap-2'>
                <input
                  type="text"
                  className='w-full border p-2 rounded shadow-slate-400 shadow-sm'
                  placeholder={'Add using a link'}
                  value={identity.link}
                  onChange={(e) => setIdentity({ ...identity, link: e.target.value })}
                />
                <button className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
              </div>
              <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                <button className='border bg-transparent rounded-2xl p-4 text-gray-600 flex items-center'>
                  <IoCloudUploadOutline style={{ fontSize: '24px', marginRight: '8px' }} />
                  Upload
                </button>
              </div>
              <p className="text-primary text-sm mt-2">Your ID will be handled according to our <a href="#" className="text-accent">Privacy Policy</a> and won't be shared with your Host or guests.</p>
              <button type="submit" className="flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-44 md:py-[8.9px]">Save</button>
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
              <button type="submit" className="flex w-full items-center justify-center rounded-[20px] bg-red-600/50 px-4 py-2 md:px-44 md:py-[8.9px]">Save</button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default Account;

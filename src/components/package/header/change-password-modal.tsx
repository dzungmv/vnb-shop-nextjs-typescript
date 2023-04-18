import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import LoadingCard from '@/components/common/loading-card';
import { setChangePasswordModal } from '@/components/redux/modal/modalSlice';
import { UserTypes } from '@/components/types';
import swal from 'sweetalert';

const ChangePasswordModal: React.FC = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user.user as UserTypes);

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [passwordError, setpasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] =
        useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);

    useEffect(() => {
        if (password !== '') setpasswordError('');
        if (confirmPassword !== '') setConfirmPasswordError('');
    }, [password, confirmPassword]);

    const handleChangePassword = async () => {
        if (password.length < 6) {
            setpasswordError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Password does not match');
            return;
        }
        try {
            setIsPending(true);
            await axios.post(
                `${process.env.SERVER_URL}/auth/change-password`,
                {
                    password,
                    email: user?.user?.email,
                },
                {
                    headers: {
                        authorization: user?.tokens?.accessToken,
                        'x-client-id': user?.user?._id,
                    },
                }
            );

            setIsPending(false);
            dispatch(setChangePasswordModal(false));
            swal({
                title: 'Success',
                icon: 'success',
                text: 'Password has been changed!',
            });
        } catch (error) {
            setConfirmPasswordError('Some thing went wrong, try again later!');
            setIsPending(false);
        }
    };
    return (
        <div className='p-4 w-[500px] mobile:w-full'>
            <div className='flex flex-col gap-2'>
                <input
                    type='password'
                    placeholder='New password'
                    className='w-full text-sm border rounded-md py-3 px-2 focus:border-colorPrimary'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                    <p className='ml-2 mt-[-8px] text-sm text-red-600'>
                        {passwordError}
                    </p>
                )}
                <input
                    type='password'
                    placeholder='Confirm password'
                    className='w-full text-sm border rounded-md py-3 px-2 focus:border-colorPrimary'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError && (
                    <p className='ml-2 mt-[-8px] text-sm text-red-600'>
                        {confirmPasswordError}
                    </p>
                )}

                {isPending && (
                    <LoadingCard
                        width='25'
                        height='25'
                        content='Change password in processing...'
                    />
                )}
            </div>

            <div className='mt-10 flex items-center justify-end gap-2'>
                <button
                    className='font-medium hover:underline hover:cursor-pointer disabled:text-gray-500'
                    onClick={() => dispatch(setChangePasswordModal(false))}
                    disabled={isPending}>
                    Close
                </button>
                <button
                    className='py-2 px-5 font-medium text-sm bg-colorPrimary hover:bg-colorPrimaryHover text-white rounded-md disabled:bg-slate-300 disabled:text-gray-500'
                    onClick={handleChangePassword}
                    disabled={isPending}>
                    Change
                </button>
            </div>
        </div>
    );
};

ChangePasswordModal.displayName = 'ChangePasswordModal';

export default ChangePasswordModal;

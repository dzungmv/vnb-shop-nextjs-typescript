import OtpResetPassword from '@/components/package/otp/reset-password';

type Props = {
    params: {
        email: string;
    };
};

export default function Page({ params: { email } }: Props) {
    return (
        <>
            <OtpResetPassword title='Rest password' email={email} />
        </>
    );
}

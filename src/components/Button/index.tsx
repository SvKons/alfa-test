import './Button.scss';

interface ButtonProps {
    label?: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button = ({ label, onClick, className, children }: ButtonProps) => {
    return (
        <button onClick={onClick} className={`button ${className}`}>
            {label && <span>{label}</span>}
            {children}
        </button>
    );
};

export default Button;

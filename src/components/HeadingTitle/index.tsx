import './HeadingTitle.scss';

interface HeadingProps {
    title: string;
    className?: string;
}

const HeadingTitle = ({ title, className = '' }: HeadingProps) => {
    return <h1 className={`main-title ${className}`}>{title}</h1>;
};

export default HeadingTitle;

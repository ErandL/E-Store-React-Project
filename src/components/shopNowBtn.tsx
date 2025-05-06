import "../index.css"

type ShopNowBtnProps = {
  text: string;
  className?: string;
};

export default function ShopNowBtn({ text, className }: ShopNowBtnProps) {
  return (
    <a className={`px-5 mt-3 border text-decoration-none rounded-3 ${className}`} href="#"> {text} </a>
  )
}

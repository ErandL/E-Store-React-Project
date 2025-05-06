import '../index.css'

type inputProp = {
  className?: string;
};

export default function Input({ className }: inputProp) {
  return (
    <div className={`input-basic ${className}`}>
      <input className='border border-0' type="text" placeholder='Search' />
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  )
}

type TagProps = {
    children: string;
};

export default function Tag({children} : TagProps) : JSX.Element {
  return (
    <div className='bg-gray-500 py-[2px] px-4 rounded-3xl text-xs'>{children}</div>
  );
}
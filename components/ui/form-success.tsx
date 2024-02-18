import { CheckCircledIcon } from '@radix-ui/react-icons';

interface FormSuccesProps {
  message?: string;
}

const FormSucces = ({ message }: FormSuccesProps) => {
  if (!message) return null;

  return (
    <div className=' bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
      <CheckCircledIcon />
      <p>{message}</p>
    </div>
  );
};

export default FormSucces;

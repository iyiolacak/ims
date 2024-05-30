import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import EmojiPicker from '../EmojiPicker';

interface CategoryFormInputs {
  name: string;
  description: string;
  emoji: string;
  icon: JSX.Element | null;
}

const AddCategoryModalForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<CategoryFormInputs>();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if(inputRef.current) {
        inputRef.current.focus();
    }
  },[inputRef])
  
  const onSubmit: SubmitHandler<CategoryFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div>
        <EmojiPicker onSelect={(emoji: any) => setValue('emoji', emoji)}/>
      </div>
      <div>
        <Input
          id="name"
          {...register('name', { required: true })}
          className="h-14 text-4xl focus:ring-0 text-start border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-medium text-neutral-800"
          placeholder="Untitled Category"
          ref={inputRef}
        />
      </div>
      <Button type="submit" className='mt-5' variant={"ghost"}>Create</Button>
    </form>
  );
};

export default AddCategoryModalForm;

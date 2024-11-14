import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import classes from './profilePage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

export default function ProfilePage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({ defaultValues: { name: '', address: '' } });

  const { user, updateProfile } = useAuth();

  const submit = async (data) => {
    try {
      await updateProfile(data);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            defaultValue={user.name}
            type="text"
            label="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 5, message: 'Minimum length is 5 characters' },
            })}
            error={errors.name?.message}
          />

          <Input
            defaultValue={user.address}
            type="text"
            label="Address"
            {...register('address', {
              required: 'Address is required',
              minLength: { value: 10, message: 'Minimum length is 10 characters' },
            })}
            error={errors.address?.message}
          />

          <Button 
            type="submit" 
            text="Update" 
            backgroundColor="#009e84" 
            disabled={!isDirty || isSubmitting} 
          />
        </form>

        <ChangePassword />
      </div>
    </div>
  );
}

import { cn } from '@/utils';
import { contactFormValidate, getZodErrors } from '@/utils/form-validators';
import useToggle from '@/utils/hooks/useToggle';
import { Loader2 } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';

type Message = {
    type: 'success' | 'error';
    text: string;
};

export default function ContactForm() {
    const [message, setMessage] = useState<Message | null>();
    const [errors, setErrors] = useState<any>({});
    const [honey, setHoney] = useState<string>('');
    const [loading, toggleLoading] = useToggle(false);
    const formRef = useRef<any>(undefined);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        toggleLoading();

        if (honey.length) return;

        const formValues = new FormData(formRef.current);
        const result = contactFormValidate.safeParse(Object.fromEntries(formValues.entries()));

        if (result.success === false) {
            const validationErrors = getZodErrors(result.error.formErrors.fieldErrors);
            setErrors(validationErrors);

            return toggleLoading();
        }

        fetch('/api/email-form', {
            method: 'POST',
            body: JSON.stringify(result.data),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success == false) {
                    setMessage({ type: 'error', text: res.message });
                } else {
                    // @ts-expect-error This resets the form, and works fine!
                    e.target.reset();
                    setMessage({ type: 'success', text: 'Submitted! Thank you!' });
                }
            })
            .catch(err => setMessage({ type: 'error', text: err.message }))
            .finally(() => toggleLoading());
    };

    return (
        <div className='mt-12'>
            <form onSubmit={handleSubmit} ref={formRef}>
                {Object.values(errors).length || message ? (
                    <p
                        className={cn(
                            'px-4 py-1 rounded-md border',
                            message?.type == 'success'
                                ? 'bg-green-200 text-green-800 border-green-800'
                                : 'bg-red-200 text-red-800 border-red-800'
                        )}
                    >
                        {message?.text || 'Validation errors. Please try again'}
                    </p>
                ) : (
                    ''
                )}
                <div className='relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 my-4'>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name'>
                                Name{' '}
                                {errors?.name && (
                                    <span className='text-sm text-red-500'>{errors?.name}</span>
                                )}
                            </label>
                            <input
                                className={errors?.name ? '!border-red-500' : ''}
                                id='name'
                                name='name'
                                autoComplete='name'
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>
                                Email{' '}
                                {errors?.email && (
                                    <span className='text-sm !text-red-500'>{errors?.email}</span>
                                )}
                            </label>
                            <input
                                className={errors?.email ? '!border-red-500' : ''}
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='on'
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor='message'>
                            Message{' '}
                            {errors?.message && (
                                <span className='text-sm text-red-500'>{errors?.message}</span>
                            )}
                        </label>
                        <textarea
                            className={`h-32 resize-none, ${
                                errors?.message ? 'border-red-500' : ''
                            }`}
                            id='message'
                            name='message'
                            autoComplete='on'
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className='opacity-0 absolute w-0 h-0 top-0 left-0'>
                    <label htmlFor='name__verify'>Leave blank if you're a human</label>
                    <input
                        id='name__verify'
                        name='name__verify'
                        autoComplete='none'
                        tabIndex={-1}
                        value={honey}
                        onChange={e => setHoney(e.target.value)}
                    />
                </div>

                <button
                    disabled={loading}
                    className={cn(
                        'text-center rounded-md border inline-flex gap-2 justify-center items-center transition no-underline text-white bg-blue-500 border-blue-500 text-lg px-8 py-2',
                        loading
                            ? 'opacity-65 cursor-not-allowed'
                            : 'hover:bg-transparent hover:text-foreground'
                    )}
                >
                    {loading ? (
                        <>
                            <Loader2 className='size-4 animate-spin' /> Loading...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
        </div>
    );
}

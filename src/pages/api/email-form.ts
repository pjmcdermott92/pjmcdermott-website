import type { APIRoute } from 'astro';
import { contactFormValidate, getZodErrors } from '@/utils/form-validators';

const JSMAILER_SERVICE_ID = import.meta.env.JSMAILER_SERVICE_ID;
const JSMAILER_TEMPLATE_ID = import.meta.env.JSMAILER_TEMPLATE_ID;
const JSMAILER_PUBLIC_KEY = import.meta.env.JSMAILER_PUBLIC_KEY;
const JSMAILER_URL = import.meta.env.JSMAILER_URL;

export const POST: APIRoute = async ({ request }) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const body = await request.json();
    const result = contactFormValidate.safeParse(body);

    if (result.success === false) {
        const fieldErrors = getZodErrors(result.error.formErrors.fieldErrors);

        return new Response(JSON.stringify({ success: false, errors: fieldErrors }), {
            status: 422,
            headers,
        });
    }

    const { name, email, message } = result.data;

    const data = {
        service_id: JSMAILER_SERVICE_ID,
        template_id: JSMAILER_TEMPLATE_ID,
        user_id: JSMAILER_PUBLIC_KEY,
        template_params: { name, email, message },
    };

    const res = await fetch(JSMAILER_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
    });

    if (res.status != 200) {
        return new Response(JSON.stringify({ success: false, message: 'An error occurred' }), {
            status: 500,
            headers,
        });
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 201,
        headers,
    });
};

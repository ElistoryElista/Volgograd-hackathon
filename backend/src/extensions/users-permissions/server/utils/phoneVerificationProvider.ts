import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

interface flashcallOptions {
    phone: string;
    publicKey: string;
    campaignId: string;
}

const flashcall = (options: flashcallOptions) => {
    const data = new FormData();

    data.append('public_key', options.publicKey); // mv to env
    data.append('phone', options.phone); // customer phone
    data.append('campaign_id', options.campaignId); // confirm phone campaign_id | mv to env
    // data.append('campaign_id', '1092838270'); // API campaign_id

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://zvonok.com/manager/cabapi_external/api/v1/phones/flashcall/',
        headers: { 
            ...data.getHeaders()
        },
        data : data
    };

    return axios(config);
}

interface checkCallStatusOptions {
    callId: string;
    publicKey: string;
}

const checkCallStatus = (options: checkCallStatusOptions) => {
    const config: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://zvonok.com/manager/cabapi_external/api/v1/phones/call_by_id/',
        headers: { },
        params: {
            public_key: options.publicKey,
            call_id: options.callId,
        }
    };

    return axios(config);
}

export default {
    flashcall,
    checkCallStatus,
};
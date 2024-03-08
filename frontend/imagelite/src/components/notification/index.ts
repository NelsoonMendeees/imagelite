import { toast } from 'react-toastify'


export const useNotification = () => {
    function notify(message: string, level: "success" | "warning" | "error" | "info") {
        toast(message, { type: level })
    }

    return { notify }
}
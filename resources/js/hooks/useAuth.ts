import { useState, useEffect } from 'react';
import { authService } from '@/services/api/auth.service';
import { User } from '@/types/user';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await authService.getProfile();
            setUser(response.data as User);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error };
}

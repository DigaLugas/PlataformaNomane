import { createClient } from '@supabase/supabase-js';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const SupabaseProvider: Provider = {
  provide: 'SUPABASE_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const supabaseUrl = configService.get<string>('SUPABASEURL');
    const supabaseKey = configService.get<string>('SUPABASEKEY');
    
    const supabase = createClient(supabaseUrl || '', supabaseKey || '', {
      auth: { persistSession: false },
    });

    if (supabaseUrl && supabaseKey) {
      console.log("Supabase already connected");
    }

    return supabase;
  },
};

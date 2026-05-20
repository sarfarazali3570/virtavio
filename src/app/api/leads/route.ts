import { NextRequest, NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation/schemas';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: result.error.format(),
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      company,
      message,
      service,
      budget,
    } = result.data as any;

    // Insert into Supabase
    const supabase = createAdminClient();

    const payload = {
      full_name: name || 'Newsletter Subscriber',
      email,
      phone: phone || null,
      company: company || null,
      message: message || 'Subscribed via newsletter form',
      service_type: service || null,
      budget: budget || null,
      status: 'new',
    };

    const { error: dbError } = await supabase
      .from('leads')
      .insert([payload]);

    if (dbError) {
      console.error('Supabase error:', dbError);

      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }



    return NextResponse.json(
      { message: 'Lead submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead API error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
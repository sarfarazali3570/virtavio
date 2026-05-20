// app/api/check-domain/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    let domain = '';
    try {
        const body = await request.json();
        domain = body.domain;

        if (!domain) {
            return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });
        }

        console.log('Checking domain:', domain); // Debug log

        // Option 1: Try Hostinger API (Using the provided key)
        const hostingerKey = process.env.HOSTINGER_API_KEY;
        if (hostingerKey) {
            try {
                // Hostinger's v1/domains/check usually expects a post with domain and tlds
                const [name, ...tldParts] = domain.split('.');
                const tld = tldParts.join('.');

                const hostingerResponse = await fetch('https://api.hostinger.com/v1/domains/check', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${hostingerKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ domain: name, tlds: [tld] })
                });

                if (hostingerResponse.ok) {
                    const hData = await hostingerResponse.json();
                    console.log('Hostinger API response:', hData); // Debug log

                    // Handle different possible Hostinger response structures
                    let isAvailable = false;
                    if (hData.results && hData.results[0]) {
                        isAvailable = hData.results[0].available;
                    } else if (typeof hData.available !== 'undefined') {
                        isAvailable = hData.available;
                    } else if (hData.status === 'available') {
                        isAvailable = true;
                    }

                    return NextResponse.json({
                        available: isAvailable,
                        domain: domain,
                        price: '$12.99/year'
                    });
                }
            } catch (hError) {
                console.error('Hostinger API direct attempt failed:', hError);
                // Continue to WhoAPI fallback
            }
        }

        // Option 2: Try WHOIS API (WhoAPI)
        const apiKey = process.env.WHOAPI_KEY;
        if (apiKey && apiKey !== 'SARFARAZ3570') { // Skip if it's just the referral code
            try {
                const whoisResponse = await fetch(`https://api.whoapi.com/?domain=${domain}&r=whois&apikey=${apiKey}`);
                if (whoisResponse.ok) {
                    const data = await whoisResponse.json();
                    const isRegistered = data.registered === true || data.registered === 1 || data.status === '0';
                    return NextResponse.json({
                        available: !isRegistered,
                        domain: domain,
                        price: '$12.99/year'
                    });
                }
            } catch (wError) {
                console.error('WhoAPI attempt failed:', wError);
            }
        }

        // Fallback: If both APIs fail, we do not show simulated "available" results.
        // We return 'available: false' as a safe default if we cannot verify availability.
        console.error('All live domain APIs failed to provide a response.');
        
        return NextResponse.json({
            available: false,
            domain: domain,
            message: 'Domain status currently unavailable via live check'
        });

    } catch (error) {
        console.error('Critical API error:', error);
        return NextResponse.json({ 
            error: 'Failed to check domain', 
            details: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}
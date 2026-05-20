import os

def convert_to_premium(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements for premium dark glassmorphism
    replacements = {
        'bg-[#F8FAFC]': 'bg-[#0A0A0A]',
        'bg-white/95': 'bg-[#0A0A0A]/95',
        'bg-white/90': 'bg-white/[0.05]',
        'bg-white': 'bg-white/[0.02]',
        'bg-slate-50': 'bg-white/5',
        'bg-blue-50': 'bg-indigo-500/10',
        'bg-slate-100': 'bg-white/10',
        'text-[#0F172A]': 'text-white',
        'text-[#475569]': 'text-slate-400',
        'text-gray-900': 'text-white',
        'text-gray-800': 'text-slate-200',
        'text-gray-600': 'text-slate-300',
        'text-gray-500': 'text-slate-400',
        'border-[#E0E7FF]': 'border-white/10',
        'border-gray-100': 'border-white/10',
        'border-gray-200': 'border-white/10',
        'border-[rgba(59,130,246,0.15)]': 'border-white/10',
        'border-[rgba(59,130,246,0.12)]': 'border-white/10',
        'border-[rgba(59,130,246,0.2)]': 'border-white/10',
        'text-blue-700': 'text-indigo-400',
        'text-blue-600': 'text-indigo-400',
        'text-blue-500': 'text-indigo-400',
        'shadow-[0_30px_80px_rgba(59,130,246,0.1)]': 'shadow-[0_30px_80px_rgba(0,0,0,0.5)]',
        'shadow-[0_15px_45px_rgba(59,130,246,0.12)]': 'shadow-[0_15px_45px_rgba(0,0,0,0.4)]',
        'shadow-[0_10px_30px_rgba(59,130,246,0.08)]': 'shadow-[0_10px_30px_rgba(0,0,0,0.4)]',
        'shadow-[0_4px_12px_rgba(59,130,246,0.08)]': 'shadow-[0_4px_12px_rgba(0,0,0,0.3)]',
        'shadow-[0_4px_16px_rgba(59,130,246,0.08)]': 'shadow-[0_4px_16px_rgba(0,0,0,0.3)]',
        'hover:border-[rgba(59,130,246,0.3)]': 'hover:border-indigo-500/30',
        'hover:shadow-[0_8px_24px_rgba(59,130,246,0.1)]': 'hover:shadow-[0_8px_24px_rgba(99,102,241,0.2)]',
        'hover:shadow-[0_20px_50px_rgba(59,130,246,0.16)]': 'hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)]',
        'hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]': 'hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)]',
        'bg-blue-100/40': 'bg-indigo-500/10',
        'bg-indigo-100/40': 'bg-purple-500/10',
        'bg-emerald-50': 'bg-emerald-500/10',
        'border-emerald-100': 'border-emerald-500/20',
        'text-emerald-600': 'text-emerald-400',
        'bg-[#1E293B]': 'bg-white/5',
        'border-t border-gray-100': 'border-t border-white/5',
        'border-b border-gray-100': 'border-b border-white/5',
        'border-y border-gray-100': 'border-y border-white/5',
        'bg-gray-50': 'bg-white/5',
        'border-blue-200': 'border-indigo-500/20',
        'bg-blue-600': 'bg-indigo-500',
        'hover:bg-blue-50': 'hover:bg-white/5',
        'hover:border-blue-300': 'hover:border-white/20',
        'bg-blue-50/50': 'bg-white/5',
        'hover:bg-blue-50/50': 'hover:bg-white/5',
        'hover:text-blue-600': 'hover:text-indigo-400',
        'border-[rgba(59,130,246,0.1)]': 'border-white/10',
        'from-blue-600': 'from-indigo-500',
        'to-blue-600': 'to-indigo-500',
        'via-blue-600': 'via-indigo-500',
    }

    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    # Also inject dark premium background effects if not already there and if it's a section
    if 'overflow-hidden' in new_content and 'bg-[#0A0A0A]' in new_content and 'noise.png' not in new_content:
        # Try to find the section open tag and insert the effects
        if '<section className=' in new_content:
            parts = new_content.split('>', 1)
            # This is a bit risky if section tag has multiple lines, but tailwind is usually one line
            pass

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

components = [
    'HeroSection.tsx',
    'TrustBar.tsx',
    'ProcessSection.tsx',
    'FinestWorkSection.tsx',
    'PartnerSection.tsx',
    'TestimonialsSection.tsx',
    'TechBarSection.tsx',
    'CTASection.tsx',
]

base_path = 'c:/Users/ASUS/Downloads/virtavio/src/components/sections/'
for comp in components:
    convert_to_premium(os.path.join(base_path, comp))

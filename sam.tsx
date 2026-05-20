
{% assign ai_gen_id = block.id | replace: '_', '' | downcase %}

{% style %}
  .ai-product-carousel-{{ ai_gen_id }} {
    width: {{ block.settings.desktop_width_percent }}%;
    max-width: 100%;
    padding: {{ block.settings.section_padding_top }}px 0 {{ block.settings.section_padding_bottom }}px;
    background-color: {{ block.settings.background_color }};
    display: block;
  }

  .ai-product-carousel-container-{{ ai_gen_id }} {
    max-width: {{ block.settings.container_width }}px;
    margin: 0 auto;
    padding: 0 {{ block.settings.container_padding }}px;
  }

  .ai-product-carousel-header-{{ ai_gen_id }} {
    text-align: {{ block.settings.heading_alignment }};
    margin-bottom: {{ block.settings.heading_spacing }}px;
  }

  .ai-product-carousel-title-{{ ai_gen_id }} {
    font-size: {{ block.settings.heading_size }}px;
    color: {{ block.settings.heading_color }};
    margin: 0 0 {{ block.settings.subheading_spacing }}px;
    font-weight: {{ block.settings.heading_weight }};
    text-transform: {{ block.settings.heading_transform }};
  }

  .ai-product-carousel-subtitle-{{ ai_gen_id }} {
    font-size: {{ block.settings.subheading_size }}px;
    color: {{ block.settings.subheading_color }};
    margin: 0;
  }

  .ai-product-carousel-wrapper-{{ ai_gen_id }} {
    position: relative;
  }

  .ai-product-carousel-track-{{ ai_gen_id }} {
    display: flex;
    gap: {{ block.settings.gap_between_cards }}px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .ai-product-carousel-track-{{ ai_gen_id }}::-webkit-scrollbar {
    display: none;
  }

  .ai-product-carousel-card-{{ ai_gen_id }} {
    flex: 0 0 calc((100% - ({{ block.settings.cards_per_row_desktop | minus: 1 }} * {{ block.settings.gap_between_cards }}px)) / {{ block.settings.cards_per_row_desktop }});
    background-color: {{ block.settings.card_background }};
    border-radius: {{ block.settings.card_border_radius }}px;
    overflow: hidden;
    border: {{ block.settings.card_border_width }}px solid {{ block.settings.card_border_color }};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  {% if block.settings.enable_card_hover %}
    .ai-product-carousel-card-{{ ai_gen_id }}:hover {
      transform: translateY(-{{ block.settings.card_hover_lift }}px);
      box-shadow: 0 {{ block.settings.card_hover_shadow }}px {{ block.settings.card_hover_shadow | times: 2 }}px rgba(0, 0, 0, 0.1);
    }
  {% endif %}

  .ai-product-carousel-image-wrapper-{{ ai_gen_id }} {
    position: relative;
    width: 100%;
    padding-bottom: {{ block.settings.image_aspect_ratio }}%;
    overflow: hidden;
    background-color: #f4f4f4;
  }

  .ai-product-carousel-image-{{ ai_gen_id }} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ai-product-carousel-image-placeholder-{{ ai_gen_id }} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f4;
  }

  .ai-product-carousel-image-placeholder-{{ ai_gen_id }} svg {
    width: 50%;
    height: 50%;
    opacity: 0.3;
  }

  .ai-product-carousel-content-{{ ai_gen_id }} {
    padding: {{ block.settings.card_content_padding }}px;
  }

  .ai-product-carousel-vendor-{{ ai_gen_id }} {
    font-size: {{ block.settings.vendor_size }}px;
    color: {{ block.settings.vendor_color }};
    margin: 0 0 {{ block.settings.vendor_spacing }}px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .ai-product-carousel-product-title-{{ ai_gen_id }} {
    font-size: {{ block.settings.product_title_size }}px;
    color: {{ block.settings.product_title_color }};
    margin: 0 0 {{ block.settings.title_spacing }}px;
    font-weight: {{ block.settings.product_title_weight }};
    line-height: 1.4;
  }

  .ai-product-carousel-product-title-{{ ai_gen_id }} a {
    color: inherit;
    text-decoration: none;
  }

  .ai-product-carousel-product-title-{{ ai_gen_id }} a:hover {
    color: {{ block.settings.link_hover_color }};
  }

  .ai-product-carousel-price-{{ ai_gen_id }} {
    font-size: {{ block.settings.price_size }}px;
    color: {{ block.settings.price_color }};
    font-weight: {{ block.settings.price_weight }};
    margin: 0 0 {{ block.settings.price_spacing }}px;
  }

  .ai-product-carousel-price-compare-{{ ai_gen_id }} {
    text-decoration: line-through;
    opacity: 0.6;
    margin-right: 8px;
  }

  .ai-product-carousel-price-sale-{{ ai_gen_id }} {
    color: {{ block.settings.sale_price_color }};
  }

.ai-product-carousel-button-{{ ai_gen_id }} {
  display: inline-block;
  width: 100%;

  padding: {{ block.settings.button_padding_vertical }}px {{ block.settings.button_padding_horizontal }}px;

  background: {{ block.settings.button_background }};
  color: {{ block.settings.button_text_color }};

  text-decoration: none;
  text-align: center;

  font-size: {{ block.settings.button_font_size }}px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  border: 2px solid #000;

  border-radius: {{ block.settings.button_border_radius }}px;

  box-shadow: 4px 4px 0px #000;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  position: relative;
}

.ai-product-carousel-button-{{ ai_gen_id }}:hover {
  background: {{ block.settings.button_hover_background }};
  color: {{ block.settings.button_hover_text_color }};

  transform: translate(2px, 2px);

  box-shadow: 2px 2px 0px #000;
}

.ai-product-carousel-button-{{ ai_gen_id }}:active {
  transform: translate(4px, 4px);

  box-shadow: 0px 0px 0px #000;
}


  .ai-product-carousel-nav-{{ ai_gen_id }} {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: {{ block.settings.nav_background }};
    color: {{ block.settings.nav_color }};
    border: none;
    width: {{ block.settings.nav_size }}px;
    height: {{ block.settings.nav_size }}px;
    border-radius: {{ block.settings.nav_border_radius }}px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.3s ease;
    opacity: {{ block.settings.nav_opacity }};
  }

  .ai-product-carousel-nav-{{ ai_gen_id }}:hover {
    background-color: {{ block.settings.nav_hover_background }};
    color: {{ block.settings.nav_hover_color }};
    opacity: 1;
  }

  .ai-product-carousel-nav-{{ ai_gen_id }}:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .ai-product-carousel-nav-prev-{{ ai_gen_id }} {
    left: {{ block.settings.nav_position }}px;
  }

  .ai-product-carousel-nav-next-{{ ai_gen_id }} {
    right: {{ block.settings.nav_position }}px;
  }

  .ai-product-carousel-nav-{{ ai_gen_id }} svg {
    width: 20px;
    height: 20px;
  }

  .ai-product-carousel-dots-{{ ai_gen_id }} {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: {{ block.settings.dots_spacing }}px;
  }

  .ai-product-carousel-dot-{{ ai_gen_id }} {
    width: {{ block.settings.dot_size }}px;
    height: {{ block.settings.dot_size }}px;
    border-radius: 50%;
    background-color: {{ block.settings.dot_color }};
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .ai-product-carousel-dot-{{ ai_gen_id }}.active {
    background-color: {{ block.settings.dot_active_color }};
    transform: scale(1.2);
  }

  @media screen and (max-width: 749px) {
    .ai-product-carousel-{{ ai_gen_id }} {
      padding: {{ block.settings.section_padding_top_mobile }}px 0 {{ block.settings.section_padding_bottom_mobile }}px;
    }

    .ai-product-carousel-title-{{ ai_gen_id }} {
      font-size: {{ block.settings.heading_size_mobile }}px;
    }

    .ai-product-carousel-subtitle-{{ ai_gen_id }} {
      font-size: {{ block.settings.subheading_size_mobile }}px;
    }

    .ai-product-carousel-card-{{ ai_gen_id }} {
      {% if block.settings.mobile_cards_view == '1' %}
        flex: 0 0 100%;
      {% elsif block.settings.mobile_cards_view == '1.3' %}
        flex: 0 0 calc(100% / 1.3);
      {% elsif block.settings.mobile_cards_view == '1.5' %}
        flex: 0 0 calc(100% / 1.5);
      {% elsif block.settings.mobile_cards_view == '2' %}
        flex: 0 0 calc((100% - {{ block.settings.gap_between_cards }}px) / 2);
      {% endif %}
    }

    {% if block.settings.hide_nav_mobile %}
      .ai-product-carousel-nav-{{ ai_gen_id }} {
        display: none;
      }
    {% endif %}
  }

  {{ block.settings.custom_css }}
{% endstyle %}

<product-carousel-{{ ai_gen_id }} class="ai-product-carousel-{{ ai_gen_id }}" {{ block.shopify_attributes }}>
  <div class="ai-product-carousel-container-{{ ai_gen_id }}">
    {% if block.settings.heading != blank or block.settings.subheading != blank %}
      <div class="ai-product-carousel-header-{{ ai_gen_id }}">
        {% if block.settings.heading != blank %}
          <h2 class="ai-product-carousel-title-{{ ai_gen_id }}">{{ block.settings.heading }}</h2>
        {% endif %}
        {% if block.settings.subheading != blank %}
          <p class="ai-product-carousel-subtitle-{{ ai_gen_id }}">{{ block.settings.subheading }}</p>
        {% endif %}
      </div>
    {% endif %}

    <div class="ai-product-carousel-wrapper-{{ ai_gen_id }}">
      {% if block.settings.show_navigation %}
        <button
          class="ai-product-carousel-nav-{{ ai_gen_id }} ai-product-carousel-nav-prev-{{ ai_gen_id }}"
          aria-label="Previous"
          data-direction="prev"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      {% endif %}

      <div class="ai-product-carousel-track-{{ ai_gen_id }}">
        {% if block.settings.product_list != blank %}
          {% for product in block.settings.product_list %}
            <div class="ai-product-carousel-card-{{ ai_gen_id }}">
              <div class="ai-product-carousel-image-wrapper-{{ ai_gen_id }}">
                {% if product.featured_image %}
                  <img
                    src="{{ product.featured_image | image_url: width: 600 }}"
                    alt="{{ product.featured_image.alt | escape }}"
                    class="ai-product-carousel-image-{{ ai_gen_id }}"
                    loading="lazy"
                    width="600"
                    height="{{ 600 | times: block.settings.image_aspect_ratio | divided_by: 100 }}"
                  >
                {% else %}
                  <div class="ai-product-carousel-image-placeholder-{{ ai_gen_id }}">
                    {{ 'product-1' | placeholder_svg_tag }}
                  </div>
                {% endif %}
              </div>

              <div class="ai-product-carousel-content-{{ ai_gen_id }}">
                {% if block.settings.show_vendor and product.vendor != blank %}
                  <p class="ai-product-carousel-vendor-{{ ai_gen_id }}">{{ product.vendor }}</p>
                {% endif %}

                <h3 class="ai-product-carousel-product-title-{{ ai_gen_id }}">
                  <a href="{{ product.url }}">{{ product.title }}</a>
                </h3>

                {% if block.settings.show_price %}
                  <div class="ai-product-carousel-price-{{ ai_gen_id }}">
                    {% if product.compare_at_price > product.price %}
                      <span class="ai-product-carousel-price-compare-{{ ai_gen_id }}">
                        {{ product.compare_at_price | money }}
                      </span>
                      <span class="ai-product-carousel-price-sale-{{ ai_gen_id }}">
                        {{ product.price | money }}
                      </span>
                    {% else %}
                      {{ product.price | money }}
                    {% endif %}
                  </div>
                {% endif %}

                {% if block.settings.show_button %}
                  <a href="{{ product.url }}" class="ai-product-carousel-button-{{ ai_gen_id }}">
                    {{ block.settings.button_text }}
                  </a>
                {% endif %}
              </div>
            </div>
          {% endfor %}
        {% else %}
          {% for i in (1..6) %}
            <div class="ai-product-carousel-card-{{ ai_gen_id }}">
              <div class="ai-product-carousel-image-wrapper-{{ ai_gen_id }}">
                <div class="ai-product-carousel-image-placeholder-{{ ai_gen_id }}">
                  {{ 'product-1' | placeholder_svg_tag }}
                </div>
              </div>
              <div class="ai-product-carousel-content-{{ ai_gen_id }}">
                {% if block.settings.show_vendor %}
                  <p class="ai-product-carousel-vendor-{{ ai_gen_id }}">Brand Name</p>
                {% endif %}
                <h3 class="ai-product-carousel-product-title-{{ ai_gen_id }}">
                  <a href="#">Product Title {{ i }}</a>
                </h3>
                {% if block.settings.show_price %}
                  <div class="ai-product-carousel-price-{{ ai_gen_id }}">₹1,999</div>
                {% endif %}
                {% if block.settings.show_button %}
                  <a href="#" class="ai-product-carousel-button-{{ ai_gen_id }}">
                    {{ block.settings.button_text }}
                  </a>
                {% endif %}
              </div>
            </div>
          {% endfor %}
        {% endif %}
      </div>

      {% if block.settings.show_navigation %}
        <button
          class="ai-product-carousel-nav-{{ ai_gen_id }} ai-product-carousel-nav-next-{{ ai_gen_id }}"
          aria-label="Next"
          data-direction="next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      {% endif %}
    </div>

    {% if block.settings.show_dots %}
      <div class="ai-product-carousel-dots-{{ ai_gen_id }}"></div>
    {% endif %}
  </div>
</product-carousel-{{ ai_gen_id }}>

<script>
  (function() {
    class ProductCarousel{{ ai_gen_id }} extends HTMLElement {
      constructor() {
        super();
        this.track = this.querySelector('.ai-product-carousel-track-{{ ai_gen_id }}');
        this.cards = this.querySelectorAll('.ai-product-carousel-card-{{ ai_gen_id }}');
        this.prevBtn = this.querySelector('.ai-product-carousel-nav-prev-{{ ai_gen_id }}');
        this.nextBtn = this.querySelector('.ai-product-carousel-nav-next-{{ ai_gen_id }}');
        this.dotsContainer = this.querySelector('.ai-product-carousel-dots-{{ ai_gen_id }}');
        this.currentIndex = 0;
        this.autoplayInterval = null;
      }

      connectedCallback() {
        if (!this.track || this.cards.length === 0) return;

        this.setupNavigation();
        this.setupDots();
        this.setupAutoplay();
        this.updateNavigation();
      }

      setupNavigation() {
        if (this.prevBtn) {
          this.prevBtn.addEventListener('click', () => this.navigate('prev'));
        }
        if (this.nextBtn) {
          this.nextBtn.addEventListener('click', () => this.navigate('next'));
        }

        this.track.addEventListener('scroll', () => {
          this.updateCurrentIndex();
          this.updateDots();
          this.updateNavigation();
        });
      }

      setupDots() {
        if (!this.dotsContainer) return;

        const totalDots = this.cards.length;
        for (let i = 0; i < totalDots; i++) {
          const dot = document.createElement('button');
          dot.classList.add('ai-product-carousel-dot-{{ ai_gen_id }}');
          dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
          if (i === 0) dot.classList.add('active');
          dot.addEventListener('click', () => this.goToSlide(i));
          this.dotsContainer.appendChild(dot);
        }
      }

      setupAutoplay() {
        const autoplay = {{ block.settings.enable_autoplay | json }};
        const delay = {{ block.settings.autoplay_delay | times: 1000 }};

        if (autoplay && delay > 0) {
          this.autoplayInterval = setInterval(() => {
            this.navigate('next');
          }, delay);

          this.addEventListener('mouseenter', () => {
            if (this.autoplayInterval) {
              clearInterval(this.autoplayInterval);
            }
          });

          this.addEventListener('mouseleave', () => {
            if (autoplay) {
              this.autoplayInterval = setInterval(() => {
                this.navigate('next');
              }, delay);
            }
          });
        }
      }

      navigate(direction) {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = {{ block.settings.gap_between_cards }};
        const scrollAmount = cardWidth + gap;

        if (direction === 'next') {
          this.track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
          this.track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }

      goToSlide(index) {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = {{ block.settings.gap_between_cards }};
        const scrollPosition = index * (cardWidth + gap);
        this.track.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }

      updateCurrentIndex() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = {{ block.settings.gap_between_cards }};
        this.currentIndex = Math.round(this.track.scrollLeft / (cardWidth + gap));
      }

      updateDots() {
        if (!this.dotsContainer) return;
        const dots = this.dotsContainer.querySelectorAll('.ai-product-carousel-dot-{{ ai_gen_id }}');
        dots.forEach((dot, index) => {
          if (index === this.currentIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }

      updateNavigation() {
        if (!this.prevBtn || !this.nextBtn) return;

        const isAtStart = this.track.scrollLeft <= 0;
        const isAtEnd = this.track.scrollLeft + this.track.offsetWidth >= this.track.scrollWidth - 1;

        this.prevBtn.disabled = isAtStart;
        this.nextBtn.disabled = isAtEnd;
      }

      disconnectedCallback() {
        if (this.autoplayInterval) {
          clearInterval(this.autoplayInterval);
        }
      }
    }

    customElements.define('product-carousel-{{ ai_gen_id }}', ProductCarousel{{ ai_gen_id }});
  })();
</script>

{% schema %}
{
  "name": "Product carousel",
  "settings": [
    {
      "type": "header",
      "content": "Products"
    },
    {
      "type": "product_list",
      "id": "product_list",
      "label": "Products",
      "limit": 12
    },
    {
      "type": "header",
      "content": "Layout"
    },
    {
      "type": "range",
      "id": "desktop_width_percent",
      "label": "Desktop width",
      "min": 50,
      "max": 100,
      "step": 5,
      "unit": "%",
      "default": 100
    },
    {
      "type": "range",
      "id": "container_width",
      "label": "Container max width",
      "min": 1000,
      "max": 1800,
      "step": 50,
      "unit": "px",
      "default": 1200
    },
    {
      "type": "range",
      "id": "container_padding",
      "label": "Container padding",
      "min": 0,
      "max": 50,
      "step": 5,
      "unit": "px",
      "default": 20
    },
    {
      "type": "range",
      "id": "section_padding_top",
      "label": "Section padding top",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "default": 50
    },
    {
      "type": "range",
      "id": "section_padding_bottom",
      "label": "Section padding bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "default": 50
    },
    {
      "type": "range",
      "id": "section_padding_top_mobile",
      "label": "Mobile padding top",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "default": 30
    },
    {
      "type": "range",
      "id": "section_padding_bottom_mobile",
      "label": "Mobile padding bottom",
      "min": 0,
      "max": 100,
      "step": 5,
      "unit": "px",
      "default": 30
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background color",
      "default": "#ffffff"
    },
    {
      "type": "header",
      "content": "Heading"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Featured Products"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading"
    },
    {
      "type": "select",
      "id": "heading_alignment",
      "label": "Alignment",
      "options": [
        {
          "value": "left",
          "label": "Left"
        },
        {
          "value": "center",
          "label": "Center"
        },
        {
          "value": "right",
          "label": "Right"
        }
      ],
      "default": "center"
    },
    {
      "type": "range",
      "id": "heading_size",
      "label": "Heading size",
      "min": 16,
      "max": 60,
      "step": 2,
      "unit": "px",
      "default": 32
    },
    {
      "type": "range",
      "id": "heading_size_mobile",
      "label": "Mobile heading size",
      "min": 16,
      "max": 40,
      "step": 2,
      "unit": "px",
      "default": 24
    },
    {
      "type": "range",
      "id": "heading_weight",
      "label": "Heading weight",
      "min": 300,
      "max": 700,
      "step": 100,
      "default": 600
    },
    {
      "type": "select",
      "id": "heading_transform",
      "label": "Text transform",
      "options": [
        {
          "value": "none",
          "label": "None"
        },
        {
          "value": "capitalize",
          "label": "Capitalize"
        },
        {
          "value": "uppercase",
          "label": "Uppercase"
        }
      ],
      "default": "none"
    },
    {
      "type": "color",
      "id": "heading_color",
      "label": "Heading color",
      "default": "#111111"
    },
    {
      "type": "range",
      "id": "subheading_size",
      "label": "Subheading size",
      "min": 12,
      "max": 24,
      "step": 1,
      "unit": "px",
      "default": 16
    },
    {
      "type": "range",
      "id": "subheading_size_mobile",
      "label": "Mobile subheading size",
      "min": 12,
      "max": 20,
      "step": 1,
      "unit": "px",
      "default": 14
    },
    {
      "type": "color",
      "id": "subheading_color",
      "label": "Subheading color",
      "default": "#666666"
    },
    {
      "type": "range",
      "id": "heading_spacing",
      "label": "Spacing below heading",
      "min": 10,
      "max": 60,
      "step": 5,
      "unit": "px",
      "default": 30
    },
    {
      "type": "range",
      "id": "subheading_spacing",
      "label": "Spacing below subheading",
      "min": 0,
      "max": 30,
      "step": 2,
      "unit": "px",
      "default": 8
    },
    {
      "type": "header",
      "content": "Carousel settings"
    },
    {
      "type": "range",
      "id": "cards_per_row_desktop",
      "label": "Cards per row (desktop)",
      "min": 2,
      "max": 6,
      "step": 1,
      "default": 4
    },
    {
      "type": "select",
      "id": "mobile_cards_view",
      "label": "Mobile cards view",
      "options": [
        {
          "value": "1",
          "label": "1 card"
        },
        {
          "value": "1.3",
          "label": "1.3 cards"
        },
        {
          "value": "1.5",
          "label": "1.5 cards"
        },
        {
          "value": "2",
          "label": "2 cards"
        }
      ],
      "default": "1.5"
    },
    {
      "type": "range",
      "id": "gap_between_cards",
      "label": "Gap between cards",
      "min": 0,
      "max": 40,
      "step": 4,
      "unit": "px",
      "default": 20
    },
    {
      "type": "checkbox",
      "id": "enable_autoplay",
      "label": "Enable autoplay",
      "default": false
    },
    {
      "type": "range",
      "id": "autoplay_delay",
      "label": "Autoplay delay",
      "min": 2,
      "max": 10,
      "step": 1,
      "unit": "s",
      "default": 4
    },
    {
      "type": "header",
      "content": "Card style"
    },
    {
      "type": "color",
      "id": "card_background",
      "label": "Card background",
      "default": "#ffffff"
    },
    {
      "type": "range",
      "id": "card_border_radius",
      "label": "Border radius",
      "min": 0,
      "max": 30,
      "step": 2,
      "unit": "px",
      "default": 8
    },
    {
      "type": "range",
      "id": "card_border_width",
      "label": "Border width",
      "min": 0,
      "max": 5,
      "step": 1,
      "unit": "px",
      "default": 1
    },
    {
      "type": "color",
      "id": "card_border_color",
      "label": "Border color",
      "default": "#ebebeb"
    },
    {
      "type": "range",
      "id": "card_content_padding",
      "label": "Content padding",
      "min": 10,
      "max": 40,
      "step": 2,
      "unit": "px",
      "default": 16
    },
    {
      "type": "checkbox",
      "id": "enable_card_hover",
      "label": "Enable hover effect",
      "default": true
    },
    {
      "type": "range",
      "id": "card_hover_lift",
      "label": "Hover lift",
      "min": 0,
      "max": 20,
      "step": 2,
      "unit": "px",
      "default": 8
    },
    {
      "type": "range",
      "id": "card_hover_shadow",
      "label": "Hover shadow",
      "min": 0,
      "max": 30,
      "step": 2,
      "unit": "px",
      "default": 10
    },
    {
      "type": "header",
      "content": "Product image"
    },
    {
      "type": "range",
      "id": "image_aspect_ratio",
      "label": "Image aspect ratio",
      "min": 50,
      "max": 150,
      "step": 5,
      "unit": "%",
      "default": 100
    },
    {
      "type": "header",
      "content": "Product info"
    },
    {
      "type": "checkbox",
      "id": "show_vendor",
      "label": "Show vendor",
      "default": true
    },
    {
      "type": "range",
      "id": "vendor_size",
      "label": "Vendor size",
      "min": 10,
      "max": 16,
      "step": 1,
      "unit": "px",
      "default": 12
    },
    {
      "type": "color",
      "id": "vendor_color",
      "label": "Vendor color",
      "default": "#999999"
    },
    {
      "type": "range",
      "id": "vendor_spacing",
      "label": "Vendor spacing",
      "min": 0,
      "max": 20,
      "step": 2,
      "unit": "px",
      "default": 8
    },
    {
      "type": "range",
      "id": "product_title_size",
      "label": "Title size",
      "min": 12,
      "max": 24,
      "step": 1,
      "unit": "px",
      "default": 16
    },
    {
      "type": "range",
      "id": "product_title_weight",
      "label": "Title weight",
      "min": 300,
      "max": 700,
      "step": 100,
      "default": 500
    },
    {
      "type": "color",
      "id": "product_title_color",
      "label": "Title color",
      "default": "#111111"
    },
    {
      "type": "color",
      "id": "link_hover_color",
      "label": "Link hover color",
      "default": "#054b7e"
    },
    {
      "type": "range",
      "id": "title_spacing",
      "label": "Title spacing",
      "min": 0,
      "max": 20,
      "step": 2,
      "unit": "px",
      "default": 8
    },
    {
      "type": "checkbox",
      "id": "show_price",
      "label": "Show price",
      "default": true
    },
    {
      "type": "range",
      "id": "price_size",
      "label": "Price size",
      "min": 12,
      "max": 24,
      "step": 1,
      "unit": "px",
      "default": 16
    },
    {
      "type": "range",
      "id": "price_weight",
      "label": "Price weight",
      "min": 300,
      "max": 700,
      "step": 100,
      "default": 600
    },
    {
      "type": "color",
      "id": "price_color",
      "label": "Price color",
      "default": "#111111"
    },
    {
      "type": "color",
      "id": "sale_price_color",
      "label": "Sale price color",
      "default": "#d0473e"
    },
    {
      "type": "range",
      "id": "price_spacing",
      "label": "Price spacing",
      "min": 0,
      "max": 20,
      "step": 2,
      "unit": "px",
      "default": 12
    },
    {
      "type": "header",
      "content": "Button"
    },
    {
      "type": "checkbox",
      "id": "show_button",
      "label": "Show button",
      "default": true
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button text",
      "default": "View Product"
    },
    {
      "type": "range",
      "id": "button_font_size",
      "label": "Font size",
      "min": 12,
      "max": 20,
      "step": 1,
      "unit": "px",
      "default": 14
    },
    {
      "type": "range",
      "id": "button_font_weight",
      "label": "Font weight",
      "min": 300,
      "max": 700,
      "step": 100,
      "default": 500
    },
    {
      "type": "range",
      "id": "button_padding_vertical",
      "label": "Padding vertical",
      "min": 5,
      "max": 20,
      "step": 1,
      "unit": "px",
      "default": 10
    },
    {
      "type": "range",
      "id": "button_padding_horizontal",
      "label": "Padding horizontal",
      "min": 10,
      "max": 40,
      "step": 2,
      "unit": "px",
      "default": 20
    },
    {
      "type": "range",
      "id": "button_border_radius",
      "label": "Border radius",
      "min": 0,
      "max": 30,
      "step": 2,
      "unit": "px",
      "default": 4
    },
    {
      "type": "color",
      "id": "button_background",
      "label": "Background",
      "default": "#111111"
    },
    {
      "type": "color",
      "id": "button_text_color",
      "label": "Text color",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "button_hover_background",
      "label": "Hover background",
      "default": "#054b7e"
    },
    {
      "type": "color",
      "id": "button_hover_text_color",
      "label": "Hover text color",
      "default": "#ffffff"
    },
    {
      "type": "header",
      "content": "Navigation arrows"
    },
    {
      "type": "checkbox",
      "id": "show_navigation",
      "label": "Show navigation",
      "default": true
    },
    {
      "type": "range",
      "id": "nav_size",
      "label": "Arrow size",
      "min": 30,
      "max": 60,
      "step": 2,
      "unit": "px",
      "default": 44
    },
    {
      "type": "range",
      "id": "nav_border_radius",
      "label": "Border radius",
      "min": 0,
      "max": 30,
      "step": 2,
      "unit": "px",
      "default": 4
    },
    {
      "type": "range",
      "id": "nav_position",
      "label": "Position from edge",
      "min": -30,
      "max": 30,
      "step": 2,
      "unit": "px",
      "default": 10
    },
    {
      "type": "range",
      "id": "nav_opacity",
      "label": "Opacity",
      "min": 0,
      "max": 1,
      "step": 0.1,
      "default": 0.8
    },
    {
      "type": "color",
      "id": "nav_background",
      "label": "Background",
      "default": "#ffffff"
    },
    {
      "type": "color",
      "id": "nav_color",
      "label": "Icon color",
      "default": "#111111"
    },
    {
      "type": "color",
      "id": "nav_hover_background",
      "label": "Hover background",
      "default": "#111111"
    },
    {
      "type": "color",
      "id": "nav_hover_color",
      "label": "Hover icon color",
      "default": "#ffffff"
    },
    {
      "type": "checkbox",
      "id": "hide_nav_mobile",
      "label": "Hide on mobile",
      "default": false
    },
    {
      "type": "header",
      "content": "Pagination dots"
    },
    {
      "type": "checkbox",
      "id": "show_dots",
      "label": "Show dots",
      "default": true
    },
    {
      "type": "range",
      "id": "dot_size",
      "label": "Dot size",
      "min": 6,
      "max": 16,
      "step": 2,
      "unit": "px",
      "default": 8
    },
    {
      "type": "color",
      "id": "dot_color",
      "label": "Dot color",
      "default": "#cccccc"
    },
    {
      "type": "color",
      "id": "dot_active_color",
      "label": "Active dot color",
      "default": "#111111"
    },
    {
      "type": "range",
      "id": "dots_spacing",
      "label": "Spacing above dots",
      "min": 10,
      "max": 50,
      "step": 5,
      "unit": "px",
      "default": 20
    },
    {
      "type": "header",
      "content": "Custom CSS"
    },
    {
      "type": "textarea",
      "id": "custom_css",
      "label": "Custom CSS"
    }
  ],
  "presets": [
    {
      "name": "Product carousel"
    }
  ]
}
{% endschema %}

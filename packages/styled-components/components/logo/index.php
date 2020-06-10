<?php
/**
 * Logo.
 *
 * Display the site name or logo.
 *
 * @package Irving_Components
 */

namespace WP_Irving;

if ( ! function_exists( '\WP_Irving\get_registry' ) ) {
	return;
}
/**
 * Register the component and callback.
 */
get_registry()->register_component_from_config(
	__DIR__ . '/component',
	[
		'callback' => function( $component ) {

			// Set the site name.
			$component->set_config( 'site_name', get_bloginfo( 'name' ) );

			// If we have a logo, pass along the url.
			// @todo update this to use the image component.
			$custom_logo_id = get_theme_mod( 'custom_logo' );
			$logo_url       = wp_get_attachment_url( $custom_logo_id );
			if ( ! empty( $logo_url ) ) {
				$component->set_config( 'logo_url', $logo_url );
			}

			return $component;
		},
	]
);

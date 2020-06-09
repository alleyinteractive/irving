<?php
/**
 * Archive title.
 *
 * Get the archive title.
 *
 * @package Irving_Components
 */

namespace WP_Irving;

use WP_Irving\Component;

if ( ! function_exists( '\WP_Irving\get_registry' ) ) {
	return;
}

/**
 * Register the component and callback.
 */
get_registry()->register_component_from_config(
	__DIR__ . '/component',
	[
		'callback' => function( Component $component ): Component {

			// Set the published timestamp.
			$component->set_config( 'content', get_the_archive_title() );

			return $component;
		},
	]
);

<?php
/**
 * Post provider.
 *
 * Provide post context to children components.
 *
 * @package Irving_Components
 */

namespace WP_Irving;

use WP_Irving\Component;

if ( ! function_exists( '\WP_Irving\get_registry' ) ) {
	return;
}

/**
 * Register the component.
 */
get_registry()->register_component_from_config( __DIR__ . '/component' );

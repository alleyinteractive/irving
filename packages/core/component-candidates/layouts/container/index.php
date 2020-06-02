<?php
/**
 * Container.
 *
 * Base wrapper component for creating layouts.
 *
 * @package Irving_Components
 */

namespace WP_Irving;

if ( ! function_exists( '\WP_Irving\get_registry' ) ) {
	return;
}

/**
 * Register the component.
 */
get_registry()->register_component_from_config( __DIR__ . '/component' );

<?php
/**
 * Post content.
 *
 * Get the post concept.
 *
 * @todo Add support for template context.
 * @todo Update the output to handle classic HTML and Gutenberg blocks.
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

			// Get the post ID from a context provider, or fallback to the global.
			$post_id = $component->get_config( 'post_id' );
			if ( 0 === $post_id ) {
				$post_id = get_the_ID();
			}

			/**
			 * Taken directly from Gutenberg.
			 *
			 * @see https://github.com/WordPress/gutenberg/blob/30cd85aebe14eee995e3162f09d31f4d4786f101/packages/block-library/src/post-content/index.php#L23
			 */
			$post_content = apply_filters( 'the_content', str_replace( ']]>', ']]&gt;', get_the_content( null, false, $post_id ) ) ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound

			return $component
				->set_config( 'content', $post_content )
				->set_config( 'oembed', true )
				->set_name( 'irving/html' );
		},
	]
);

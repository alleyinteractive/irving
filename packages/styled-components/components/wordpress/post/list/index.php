<?php
/**
 * Post lists.
 *
 * Iterate through a WP_Query's posts.
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

			global $wp_query;
			$post_query = $wp_query;

			$after      = (array) ( $component->get_config( 'templates' )['after'] ?? [] );
			$wrapper    = (array) ( $component->get_config( 'templates' )['wrapper'] ?? [] );
			$item       = (array) ( $component->get_config( 'templates' )['item'] ?? [] );
			$before     = (array) ( $component->get_config( 'templates' )['before'] ?? [] );
			$no_results = (array) ( $component->get_config( 'templates' )['no_results'] ?? [ 'no results found' ] );

			$query_args = (array) $component->get_config( 'query_args' );

			if ( ! empty( $query_args ) ) {

				if ( wp_validate_boolean( $query_args['exclude'] ?? false ) ) {
					$query_args['post__not_in'] = post_list_get_and_add_used_post_ids();
				}

				$post_query = new \WP_Query( $query_args );
			}

			// No results.
			if ( ! $post_query->have_posts() ) {
				return $component->set_children( $no_results );
			}

			$post_ids = wp_list_pluck( $post_query->posts, 'ID' );

			post_list_get_and_add_used_post_ids( $post_ids );

			$items = [];
			foreach ( $post_ids as $post_id ) {

				$items[] = [
					'name'     => 'irving/post',
					'config'   => [
						'post_id' => $post_id,
					],
					'children' => $item,
				];
			}

			$component->set_children( $items );

			// Wrap the children.
			if ( ! empty( $wrapper ) ) {
				$component->set_child( ( Templates\setup_component( $wrapper[0] ) )->set_children( $component->get_children() ) );
			}

			$component->prepend_children( $before );
			$component->append_children( $after );

			return $component;
		},
	]
);

/**
 * Keep track of used post IDs to de-duplicate with `post__not_in`.
 *
 * @param array $post_ids_to_add Array of post ids to flag as used.
 * @return array
 */
function post_list_get_and_add_used_post_ids( array $post_ids_to_add = [] ): array {
	static $used_post_ids;

	// Initialize values.
	if ( is_null( $used_post_ids ) ) {
		$used_post_ids = [];
	}

	// Merge additional values.
	if ( ! empty( $post_ids_to_add ) ) {
		$used_post_ids = array_unique( array_merge( $used_post_ids, $post_ids_to_add ) );
	}

	return $used_post_ids;
}

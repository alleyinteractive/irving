<?php
/**
 * Menu.
 *
 * Output links as menu items.
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

			// Menu location.
			$location    = $component->get_config( 'location' );
			$menu_id     = get_nav_menu_locations()[ $component->get_config( 'location' ) ] ?? 0;
			$menu_object = wp_get_nav_menu_object( $menu_id );

			// Invalid menu.
			if ( ! $menu_object instanceof \WP_Term ) {
				return $component->set_children( [] );
			}

			// Include the menu name.
			$component->set_config( 'menu_name', $menu_object->name ?? 'Default' );

			// Recursively build the children components.
			$component->set_children( convert_menu_to_components( (array) wp_get_nav_menu_items( $menu_id ) ) );

			return $component;
		},
	]
);

/**
 * Recursively build a menu component with all the menu items.
 *
 * @param array   $menu_items Array of \WP_Post menu items.
 * @param integer $parent_id  Parent ID of the menu item we're iterating on.
 * @return array
 */
function convert_menu_to_components( array $menu_items, $parent_id = 0 ) {

	$menu = [];

	foreach ( $menu_items as $menu_item ) {

		// Validate the menu item object.
		if ( ! $menu_item instanceof \WP_Post ) {
			continue;
		}

		// Convert the menu class instance into a simpler array format.
		$menu_item = new Component(
			'irving/menu-item',
			[
				'config' => [
					'attribute_title' => (string) $menu_item->attr_title,
					'classes'         => array_filter( (array) $menu_item->classes ),
					'id'              => absint( $menu_item->ID ),
					'parent_id'       => absint( $menu_item->menu_item_parent ),
					'target'          => (string) $menu_item->target,
					'title'           => (string) $menu_item->title,
					'url'             => (string) $menu_item->url ?? get_the_permalink( $menu_item ),
				],
			]
		);

		// If the parent ID matches this loop, recursively build the children.
		if ( $menu_item->get_config( 'parent_id' ) === $parent_id ) {
			$menu_item->set_children( convert_menu_to_components( $menu_items, $menu_item->get_config( 'id' ) ) );
			$menu[] = $menu_item;
		}
	}

	return $menu;
}

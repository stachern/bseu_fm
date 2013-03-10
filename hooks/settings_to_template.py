from settings import TEMPLATE_CONSTANTS


def settings_to_template(page, templ_vars):
    templ_vars['settings'] = TEMPLATE_CONSTANTS
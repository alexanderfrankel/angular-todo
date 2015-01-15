require 'spec_helper'

feature "Creating, editing, and deleting a list", js: true do
   scenario "CRUD a list" do
     visit '/'
     click_on "New List"

     fill_in "name", with: "coolest"
     click_on "Save"

     expect(page).to have_content("coolest")

     click_on "edit"

     fill_in "name", with: "cooler"
     click_on "Save"

     expect(page).to have_content("cooler")

     visit "/"
     fill_in "keywords", with: "cooler"
     click_on "Search"

     click_on "cooler"
     click_on "delete"

     expect(List.find_by_name("cooler")).to be_nil
   end
end

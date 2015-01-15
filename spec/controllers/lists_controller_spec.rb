require 'spec_helper'

describe ListsController do
  render_views
  describe "index" do
    before do
      List.create!(name: "cool")
      List.create!(name: "cool2")
      List.create!(name: "not")

      xhr :get, :index, format: :json, keywords: keywords
    end

    subject(:results) { JSON.parse(response.body) }

    def extract_names(results)
      results.map { |result| result["name"] }
    end

    context "when the search finds results" do
      let(:keywords) { 'cool' }
      it 'should 200' do
        expect(response.status).to eq(200)
      end
      it 'should return 2 results' do
        expect(results.size).to eq(2)
      end
      it 'should include cool' do
        expect(extract_names(results)).to include('cool')
      end
      it 'should include cool 2' do
        expect(extract_names(results)).to include('cool2')
      end
      it 'should not include not' do
        expect(extract_names(results)).to_not include('not')
      end
    end

    context "when the search does not find results" do
      let(:keywords) { 'noooooo' }
      it 'should 200' do
        expect(response.status).to eq(200)
      end
      it 'should return no results' do
        expect(results.size).to eq(0)
      end
    end
  end

  describe "show" do
    before do
      xhr :get, :show, format: :json, id: list_id
    end

    subject(:results) { JSON.parse(response.body) }

    context "when the list exists" do
      let(:list) {
        List.create!(name: 'cool')
      }
      let(:list_id) { list.id }

      it {expect(response.status).to eq(200)}
      it {expect(results["id"]).to eq(list.id)}
      it {expect(results["name"]).to eq(list.name)}
    end

    context "when the list doesn't exist" do
      let(:list_id) {-999}
      it {expect(response.status).to eq(404)}
    end
  end

  describe "create" do
    before do
      xhr :post, :create, format: :json, list: { name: "sweet" }
    end

    it {expect(response.status).to eq(201)}
    it {expect(List.last.name).to eq("sweet")}
  end

  describe "update" do
    let(:list) { List.create!(name: "sweetness") }
    before do
      xhr :put, :update, format: :json, id: list.id, list: {name: "sweeter"}
      list.reload
    end

    it {expect(response.status).to eq(204)}
    it {expect(list.name).to eq("sweeter")}
  end

  describe "destroy" do
    let(:list) { List.create!(name: "sweetness") }
    before do
      xhr :delete, :destroy, format: :json, id: list.id
    end

    it {expect(response.status).to eq(204)}
    it {expect(List.find_by_id(list.id)).to be_nil}
  end
end

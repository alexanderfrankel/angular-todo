lists = %w[cool cool2 not]

lists.each { |list| List.create!(name:list) }
